import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fileValidator } from '../validators/file-validator';

@Component({
    selector: 'app-page-edition-article',
    templateUrl: './page-edition-article.component.html',
    styleUrls: ['./page-edition-article.component.scss']
})
export class PageEditionArticleComponent {

    public formEditionArticle: FormGroup = this.formBuilder.group({
        "id": [null],
        "titre": ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
        "auteur": ["", [Validators.minLength(10), Validators.maxLength(50)]],
        "description": ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        "image": [null, [fileValidator(["jpg", "png", "gif", "jpeg"])]]
    })

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe({
            next: (parametres: any) => {
                if (parametres.id) {
                    this.http.get("http://localhost:8080/article/" + parametres.id)
                        .subscribe(
                            {
                                next: article => this.formEditionArticle.patchValue(article),
                                error: (erreur: HttpErrorResponse) => console.log(erreur)
                            }
                        )
                }
            }
        })
    }

    onSubmit(): void {

        if (this.formEditionArticle.valid) {
            this.http
                .post("http://localhost:8080/article", this.formEditionArticle.value)
                .subscribe({
                    next: resultat => {
                        alert("Le formulaire a été envoyé...")
                        this.router.navigateByUrl("/accueil")
                    },
                    error: (resultat: HttpErrorResponse) => {
                        if (resultat.status == 400) {
                            alert("Un article porte déjà ce nom")
                        } else {
                            alert("Erreur inconnu")
                        }
                    }
                })
        }
    }
}
