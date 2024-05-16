import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-firebase-password-reset-dialog.component.html',
  styleUrls: ['./forgot-firebase-password-reset-dialog.component.css']
})
export class ForgotFirebasePasswordResetDialogComponent {
  email: string;

  constructor(
    private afAuth: AngularFireAuth,
    public dialogRef: MatDialogRef<ForgotFirebasePasswordResetDialogComponent>
  ) {
  }

  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        console.log('Password reset email sent successfully');
        this.dialogRef.close();
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
      });
  }
}
