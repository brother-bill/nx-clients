import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-plaid-link',
    standalone: true,
    imports: [NgxPlaidLinkModule, CommonModule],
    templateUrl: './plaid-link.component.html',
    // styleUrl: ''
})
export class PlaidLinkComponent implements OnInit {
    public linkToken = '';
    public accessToken = '';
    public loading$ = new BehaviorSubject<boolean>(true);

    constructor(private http: HttpClient) {
        console.log('environment', environment);
    }

    async ngOnInit() {
        // 1 was for develop, 2 was for sandbox, 3 development
        const userId = '2'; // Replace with actual user ID
        const response: any = await this.http
            .get(`/api/plaid/link-token/${userId}`)
            .toPromise();
        this.linkToken = response?.linkToken;
        this.loading$.next(false);
    }

    async onSuccess(event: any) {
        const publicToken = event.token;
        console.log('onSuccess', publicToken);
        const response: any = await this.http
            .post('/api/plaid/exchange-token', { publicToken })
            .toPromise();
        this.accessToken = response?.accessToken;
        // Store the accessToken for future API calls
    }

    onExit(event: any) {
        console.log('Plaid Link exited:', event);
    }

    onLoad(event: any) {
        console.log('Plaid Link loaded:', event);
    }

    onEvent(event: any) {
        console.log('Plaid Link event:', event);
    }

    async getTransactions() {
        const response: any = await this.http
            .get(`/api/plaid/transactions/${this.accessToken}`, {
                // params: { startDate, endDate },
            })
            .toPromise();
        console.log('transactions', response);
        // Handle the transactions data
    }

    public onClick($event: any) {
        console.log('Button clicked', $event);
    }
}
