import { HttpErrorResponse } from "@angular/common/http";
import { hasIn, isEmpty } from "lodash-es";

/**
 * This service provide support error sanitizartion and messages
 */
export class ErrorService {

    /**
     * Filter Error Response and get message from response 
     * @return string
     */
    static getHttpErrMsg(errResponse : HttpErrorResponse) {
        console.log({
            errResponse: errResponse,
            DeverrResponse: errResponse?.error?.message,
            httpError: errResponse?.message
        })
        // capture the error message from Http Error Response
        // Message was set manually by developer
        if (hasIn(errResponse, 'error') && !isEmpty(errResponse.error.message)) {
            return errResponse.error.message;
        }
        
        // Automatic response error message which was generated based on 
        // Http Status Code
        return 'Server Connection Failed...!!';
    }

}