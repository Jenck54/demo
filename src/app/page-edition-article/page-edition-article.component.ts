import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-edition-article',
    templateUrl: './page-edition-article.component.html',
    styleUrls: ['./page-edition-article.component.scss']
})
export class PageEditionArticleComponent {

    public formEditionArticle: FormGroup = this.formBuilder.group({
        "titre": ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
        "auteur": ["", [Validators.minLength(10), Validators.maxLength(50)]],
        "description": ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    })

    constructor(private router: Router, private formBuilder: FormBuilder) { }

    onSubmit(): void {

        if (this.formEditionArticle.valid) {
            alert("Le formulaire a été envoyé!")
            this.router.navigateByUrl("/accueil")
        }
    }
}
