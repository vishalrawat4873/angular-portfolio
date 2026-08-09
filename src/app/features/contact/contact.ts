import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface ContactLink {
  label: string;
  value: string;
  icon: string;
  url: string;
  colorClass: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

  isSubmitting = signal(false);
  isSubmitted  = signal(false);

  contactLinks: ContactLink[] = [
    {
      label:      'Email',
      value:      'vishalrawatssr@gmail.com',
      icon:       'ti-mail',
      url:        'mailto:vishalrawatssr@gmail.com',
      colorClass: 'icon--blue'
    },
    {
      label:      'LinkedIn',
      value:      'vishal-rawat',
      icon:       'ti-brand-linkedin',
      url:        'https://www.linkedin.com/in/vishal-rawat-b82358212/',
      colorClass: 'icon--blue'
    },
    {
      label:      'YouTube',
      value:      '@vishalrawat770 · 3K subscribers',
      icon:       'ti-brand-youtube',
      url:        'https://www.youtube.com/@vishalrawat770',
      colorClass: 'icon--red'
    },
    {
      label:      'GitHub',
      value:      'My projects & code',
      icon:       'ti-brand-github',
      url:        'https://github.com/',
      colorClass: 'icon--purple'
    }
  ];

  socialLinks = [
    { label: 'LinkedIn', icon: 'ti-brand-linkedin', url: 'https://www.linkedin.com/in/vishal-rawat-b82358212/' },
    { label: 'YouTube',  icon: 'ti-brand-youtube',  url: 'https://www.youtube.com/@vishalrawat770' },
    { label: 'GitHub',   icon: 'ti-brand-github',   url: 'https://github.com/' },
  ];

  purposeOptions = [
    'Full-time opportunity',
    'Freelance project',
    'Open source collaboration',
    'Just saying hello'
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      purpose: ['Full-time opportunity'],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    // Simulate API call — we'll wire real backend on Day 19
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.isSubmitting.set(false);
    this.isSubmitted.set(true);
    this.form.reset();

    this.snackBar.open('Message sent! I\'ll get back to you soon.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar--success']
    });
  }
}