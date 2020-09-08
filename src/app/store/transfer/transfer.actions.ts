import { createAction, props } from '@ngrx/store';
import { Transfer } from '../../models/transfer-model';

export const MakeTransferRequest = createAction(
    '[MakeTransferRequest] Make Transfer Post Request',
    props<{ payload: Transfer }>()
);

export const MakeTransferRequestSuccess = createAction(
    '[MakeTransferRequest] Make Transfer Post Request Success',
    props<{ response: any }>()
);

export const MakeTransferRequestError = createAction(
    '[MakeTransferRequest] Make Transfer Post Request Error',
);

