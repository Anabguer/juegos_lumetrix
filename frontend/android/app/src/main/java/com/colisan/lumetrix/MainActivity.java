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
}
