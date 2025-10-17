package com.colisan.lumetrix;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 🔍 HABILITAR WEBVIEW DEBUGGING (Para Chrome DevTools)
        WebView.setWebContentsDebuggingEnabled(true);
    }

    @Override
    public void onPause() {
        super.onPause();
        
        android.util.Log.i("Lumetrix", "Forzando pause de WebView + JS kill-switch + AudioTrack nativo");
        
        if (this.bridge != null && this.bridge.getWebView() != null) {
            WebView w = (WebView) this.bridge.getWebView();
            
            // 1) Pausa de motor Chromium (para HTML5 audio/video y timers)
            w.onPause();
            w.pauseTimers();

            // 2) Kill-switch JS por si hay players propios (Howler / WebAudio / <audio> sueltos)
            w.post(() -> w.evaluateJavascript(
                "try{window.__pauseAllAudio&&window.__pauseAllAudio();}catch(e){};" +
                "try{window.__suspendAudioContext&&window.__suspendAudioContext();}catch(e){};" +
                "try{document.querySelectorAll('audio').forEach(a=>{a.pause();a.currentTime=0;});}catch(e){};" +
                "try{if(window.Howler){Howler.stop();}}catch(e){}"
            , null));
        }
        
        // 3) Forzar pause del AudioTrack nativo
        try {
            android.media.AudioManager audioManager = (android.media.AudioManager) getSystemService(AUDIO_SERVICE);
            if (audioManager != null) {
                // Abandonar audio focus para forzar pause de todos los streams
                audioManager.abandonAudioFocus(null);
                android.util.Log.i("Lumetrix", "AudioManager: Audio focus abandonado para forzar pause");
                
                // Forzar stop de todos los streams de audio
                audioManager.setStreamMute(android.media.AudioManager.STREAM_MUSIC, true);
                android.util.Log.i("Lumetrix", "AudioManager: Stream de música silenciado");
            }
        } catch (Exception e) {
            android.util.Log.e("Lumetrix", "Error en AudioManager: " + e.getMessage());
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        if (this.bridge != null && this.bridge.getWebView() != null) {
            WebView w = (WebView) this.bridge.getWebView();
            // Repite por si el sistema pasa directo a onStop sin dar tiempo al JS
            w.onPause();
            w.pauseTimers();
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (this.bridge != null && this.bridge.getWebView() != null) {
            WebView w = (WebView) this.bridge.getWebView();
            // Sólo reanuda timers del WebView; NO reanudes audio automáticamente
            w.resumeTimers();
            // No llames a w.onResume() si no quieres que Chromium reactive media en caliente
        }
        
        // Restaurar streams de audio cuando la app vuelve al primer plano
        try {
            android.media.AudioManager audioManager = (android.media.AudioManager) getSystemService(AUDIO_SERVICE);
            if (audioManager != null) {
                // Restaurar streams de audio
                audioManager.setStreamMute(android.media.AudioManager.STREAM_MUSIC, false);
                android.util.Log.i("Lumetrix", "AudioManager: Stream de música restaurado");
            }
        } catch (Exception e) {
            android.util.Log.e("Lumetrix", "Error en AudioManager onResume: " + e.getMessage());
        }
    }
}
