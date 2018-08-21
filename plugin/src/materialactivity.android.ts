import { setActivityCallbacks, AndroidActivityCallbacks } from 'ui/frame';

interface AppCompatCallback {
    new (owner: MaterialActivity): android.support.v7.app.AppCompatCallback;
}

let AppCompatCallback: AppCompatCallback;
let APILEVEL: number;
let AndroidButton: typeof android.widget.Button;

function initializeAppCompatCallback(): void {
    if (AppCompatCallback) {
        return;
    }

    @Interfaces([android.support.v7.app.AppCompatCallback])
    class AppCompatCallbackImpl extends java.lang.Object implements android.support.v7.app.AppCompatCallback {
        constructor(public owner: MaterialActivity) {
            super();
            return global.__native(this);
        }

        public onSupportActionModeStarted(mode) {}

        public onSupportActionModeFinished(mode) {}
        public onWindowStartingSupportActionMode(callback) {
            return null;
        }
    }

    AppCompatCallback = AppCompatCallbackImpl;
}

@JavaProxy('com.akylas.MaterialActivity')
class MaterialActivity extends android.app.Activity {
    private _callbacks: AndroidActivityCallbacks;
    private delegate: android.support.v7.app.AppCompatDelegate;
    public onCreate(savedInstanceState: any): void {
        // android.os.Bundle
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
        initializeAppCompatCallback();
        const compatCallback = new AppCompatCallback(this);
        this.delegate = android.support.v7.app.AppCompatDelegate.create(this, compatCallback);
        this.delegate.onCreate(savedInstanceState);
        this.delegate.setContentView(this._callbacks.getRootView().nativeViewProtected);
    }

    public onSaveInstanceState(outState: any): void {
        // android.os.Bundle
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    public onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    public onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    public onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    public onActivityResult(requestCode: number, resultCode: number, data: any): void {
        // android.content.Intent
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }
}
