package com.nativescript.material.bottomsheet;

import android.content.Context;
import android.view.ViewGroup;
import android.view.View;

public class BottomSheetDialogFragment extends com.google.android.material.bottomsheet.BottomSheetDialogFragment {
    public interface BottomSheetDialogFragmentListener {
        android.app.Dialog onCreateDialog(BottomSheetDialogFragment fragment, android.os.Bundle savedInstanceState);

        android.view.View onCreateView(BottomSheetDialogFragment fragment, android.view.LayoutInflater inflater, android.view.ViewGroup container,
                android.os.Bundle savedInstanceState);

        void onStart(BottomSheetDialogFragment fragment);

        void onDismiss(BottomSheetDialogFragment fragment, android.content.DialogInterface dialog);

        void onDestroy(BottomSheetDialogFragment fragment);
    }

    BottomSheetDialogFragmentListener listener;

    public BottomSheetDialogFragment() {
        super();
    }

    public void setListener(BottomSheetDialogFragmentListener listener) {
        this.listener = listener;
    }

    @Override
    public android.app.Dialog onCreateDialog(android.os.Bundle savedInstanceState) {
        if (listener != null) {
            return listener.onCreateDialog(this, savedInstanceState);
        }
        return super.onCreateDialog(savedInstanceState);
    }

    @Override
    public android.view.View onCreateView(android.view.LayoutInflater inflater, android.view.ViewGroup container,
            android.os.Bundle savedInstanceState) {
        if (listener != null) {
            return listener.onCreateView(this, inflater, container, savedInstanceState);
        }

        return super.onCreateView(inflater, container, savedInstanceState);
    }

    @Override
    public void onStart() {
        super.onStart();
        if (listener != null) {
            listener.onStart(this);
        }
    }

    @Override
    public void onDismiss(android.content.DialogInterface dialog) {
        super.onDismiss(dialog);
        if (listener != null) {
            listener.onDismiss(this, dialog);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (listener != null) {
            listener.onDestroy(this);
        }
    }

}