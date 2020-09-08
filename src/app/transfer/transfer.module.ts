import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SLICE_ID_TRANSFER, reducer } from '../store/transfer/transfer.reducer';
import { TransferEffects } from '../store/transfer/transfer.effects';
import { ApiService } from '../services/api-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxChartsModule } from '@swimlane/ngx-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferListContainerComponent } from './transfer-list-container/transfer-list.container.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { MakeTransferContainerComponent } from './make-transfer-container/make-transfer.container.component';
import { TransferItemComponent } from './transfer-item/transfer-item.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        MakeTransferComponent,
        MakeTransferContainerComponent,
        TransferListComponent,
        TransferListContainerComponent,
        TransferItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        HttpClientModule,
        NgxChartsModule,
        StoreModule.forFeature(SLICE_ID_TRANSFER, reducer),
        EffectsModule.forRoot([TransferEffects])
    ],
    exports: [MakeTransferContainerComponent, TransferListContainerComponent],
    providers: [ApiService, HttpClient]
})
export class TransferModule { }
