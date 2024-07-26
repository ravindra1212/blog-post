import { HttpErrorResponse } from "@angular/common/http";
import { has, hasIn, isEmpty } from "lodash-es";

/**
 * This service provide support error sanitizartion and messages
 */
export class ErrorService {

    /**
     * Filter Error Response and get message from response 
     * @return string
     */
    static getHttpErrMsg(errResponse : HttpErrorResponse) {

        // capture the error message from Http Error Response
        // Message was set manually by developer
        if (has(errResponse, 'error') && !isEmpty(errResponse.error.message)) {
            return errResponse.error.message;
        }
        
        // Automatic response error message which was generated based on 
        // Http Status Code
        return 'Server Connection Failed...!!';
    }

}