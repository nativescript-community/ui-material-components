package com.nativescript.material.snackbar;

import android.content.Context;
import com.google.android.material.snackbar.Snackbar;

public class SnackCallback extends
        com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback<com.google.android.material.snackbar.Snackbar> {
    public interface SnackCallbackListener {
        public void onDismissed(Snackbar snackbar, int event);

        public void onShown(Snackbar snackbar);
    }

    SnackCallbackListener listener;

    public SnackCallback() {
        super();
    }

    public void setListener(SnackCallbackListener listener) {
        this.listener = listener;
    }

    @Override
    public void onDismissed(Snackbar snackbar, int event) {
        if (listener != null) {
            listener.onDismissed(snackbar, event);
        }
    }

    @Override
    public void onShown(Snackbar snackbar) {
        if (listener != null) {
            listener.onShown(snackbar);
        }
    }

}