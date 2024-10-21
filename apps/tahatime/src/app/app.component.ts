import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaidLinkComponent } from './feature/budget/plaid/plaid-link.component';

@Component({
    standalone: true,
    imports: [RouterModule, PlaidLinkComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'tahatime';
}
