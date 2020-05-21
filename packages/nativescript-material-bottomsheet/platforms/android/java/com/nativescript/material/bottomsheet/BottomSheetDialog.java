package com.nativescript.material.bottomsheet;

import android.content.Context;
import android.view.ViewGroup;
import android.view.View;

public class BottomSheetDialog extends com.google.android.material.bottomsheet.BottomSheetDialog {
    public interface BottomSheetDialogListener {
        boolean onBackPressed(BottomSheetDialog dialog);

        void onDetachedFromWindow(BottomSheetDialog dialog);
    }

    BottomSheetDialogListener listener;

    public BottomSheetDialog(Context context, int themeResId) {
        super(context, themeResId);
    }

    public void setListener(BottomSheetDialogListener listener) {
        this.listener = listener;
    }

    @Override
    public void onBackPressed() {
        if (listener == null || !listener.onBackPressed(this)) {
            super.onBackPressed();
        }
    }

    public void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        if (listener != null) {
            listener.onDetachedFromWindow(this);
        }
    }

}