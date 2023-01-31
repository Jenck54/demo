import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-contact',
    templateUrl: './page-contact.component.html',
    styleUrls: ['./page-contact.component.scss']
})
export class PageContactComponent {

    public formContact: FormGroup = this.formBuilder.group({
        "email": ["", [Validators.required, Validators.email]],
        "objet": ["J'ai un problème", [Validators.required, Validators.maxLength(20)]],
        "message": ["", [Validators.required, Validators.minLength(10), Validators.maxLength(30)]]
    })

    constructor(private router: Router, private formBuilder: FormBuilder) {}

    onSubmit(): void {

        if(this.formContact.valid) {
            alert("Le formulaire a été envoyé!")
            this.router.navigateByUrl("/accueil")
        }
    }
}
