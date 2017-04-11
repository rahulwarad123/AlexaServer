

var TidePooler = require('./../../../apps/tide-pooler/tide-pooler.js');
var aos = require('./../../../apps/aos/aos.js');
var ars = require('./../../../apps/ars/ars.js');
var q = require('q');

var ApiAiIntentHandler = function () { };

ApiAiIntentHandler.prototype.processResponse = function (body) {
    var deferred = q.defer();
    if (body.result && body.result.metadata && body.result.metadata.intentName) {
        intentHandlers(body)
            .then(function (responseInfo) {
                deferred.resolve(responseInfo);
            });
    }
    return deferred.promise;
}

function intentHandlers(body) {
    var deferred = q.defer();
    var intentName = body.result.metadata.intentName;
    var responseBody = {};
    switch (intentName.toUpperCase()) {
        case "WELCOME":
            handleWelcomeIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AGENT-FIND":
            handleAgentFindIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AGENT-FIND-BYZIP":
            handleAgentFindByZip(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AGENT-FIND-BYCURRENTLOC":
            break;
        case "AGENT-FIND-EMAIL-YES":
            handleAgentFindEmailYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AGENT-FIND-EMAIL-NO":
            handleAgentFindEmailNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AGENT-FIND-EMAIL-SEND":
            handleAgentFindEmailSend(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "WEATHERFORECAST":
            var message = "Today in Boston: Fair, the temperature is 37 degree fahrenheit.";
            responseBody.speech = message;
            responseBody.displayText = message;
            deferred.resolve(responseBody);
            break;
        case "TDSUPPORTEDCITIES":
            var poolerSpeechResponse = TidePooler.getSupportedCitiesResponse();
            responseBody.speech = poolerSpeechResponse.speechOutput.text;
            responseBody.displayText = poolerSpeechResponse.speechOutput.text;
            deferred.resolve(responseBody);
            break;
        case "TDDIALOGTIDEINTENT":
            dialogTideIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "TDDIALOG-CITY":
            handleTDCityIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "TDDIALOG-DATE":
            handleTDDateIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "ARS-SERVICE-START":
        case "ARS-SERVICE-LOCATION":
            handleARSStartIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "ARS-SERVICE-VEHICLE-YEAR":
        case "ARS-SERVICE-VEHICLE-MAKE":
        case "ARS-SERVICE-VEHICLE-MODEL":
        case "ARS-SERVICE-VEHICLE-YMM":
            handleARSVehicleYMMIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "ARS-SERVICE-PRICE-AGREE":
            handleARSAgreementIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
            
             case "HELP":
            handleHelpIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
         case "MENU":
            handleMenuIntent(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;  
        case "AOS-RENTERS-QUOTESTART":
            handleAosRentersQuoteStart(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-QUOTESTART-NO":
            handleAosRentersQuoteStartNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;      
                 
        case "AOS-RENTERS-INSURANCE":
            handlerAOSRentersInsuranceStart(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-NAME":
        case "AOS-RENTERS-LASTNAME":
            handlerAOSRentersInsuranceName(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-DOB":
            handlerAOSRentersInsuranceDOB(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-CURADDR":
            handlerAOSRentersInsuranceAddr(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-CURADDR-LOC":
            handlerAOSRentersInsuranceAddrCurLoc(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-CURCITY-ZIP":        
            handlerAOSRentersInsuranceCityZip(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;

        case "AOS-RENTERS-PHONENUMBER":
            handlerAOSRentersPhoneNumber(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-PHONENUMBER-AUTHORIZE-NO":
        case "AOS-RENTERS-PHONENUMBER-AUTHORIZE-YES":
                handlerAOSRentersPhoneNumberAuthorize(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-EMAILADDRESS":
            handlerAOSRentersEmailAddress(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-INSADDRSAME-YES":
            handlerAOSRentersInsuranceInsuredAddrSame(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;

        case "AOS-RENTERS-INSADDRSAME-NO":        
            handlerAOSRentersInsuranceInsuredAddrDiff(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-ADDRSTOINSURE":
            handlerAOSRentersNewCityZip(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-DIFFADDRS":
            handlerAOSRentersDiffAddress(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
            case "AOS-RENTERS-CREDITHISTORY-AUTHORIZE":
         handlerAOSRentersCrediHistoryAuthorize(body, deferred)
                 .then(function (responseInfo) {
                     deferred.resolve(responseInfo);
                 });
             break;
         case "AOS-RENTERS-EMPSTATUS":
            handlerAOSRentersEmpStatus(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-GENDER":
            handlerAOSRentersGender(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-LIVEDMORETHANTWOYRS-YES":
            handlerAOSRentersLivedMoreThanTwoYrsYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
         case "AOS-RENTERS-RESIDENCEPROCEED":
            handlerAOSRentersResidence(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-LIVEDMORETHANTWOYRS-NO":
            handlerAOSRentersLivedMoreThanTwoYrsNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-PREVZIPANDCITY":
            handlerAOSRentersPrevCityZip(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-PREVSTREETADDRESS":
            handlerAOSRentersPrevStreetAddrs(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        
        case "AOS-RENTERS-ISPRIMARYRESIDENCE-YES":
            handlerAOSRentersIsPrimaryResYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-ISPRIMARYRESIDENCE-NO":
            handlerAOSRentersIsPrimaryResNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-RESIDENCELOCATION-YES":
            handlerAOSRentersResidenceLocYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-RESIDENCELOCATION-NO":
            handlerAOSRentersResidenceLocNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-ISBUSINESSOPERATED-YES":
            handlerAOSRentersIsBusinessOperatedYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-ISBUSINESSOPERATED-NO":
            handlerAOSRentersIsBusinessOperatedNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-RESIDENCETYPE":
            handlerAOSRentersResidenceType(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-ISFIVEORMOREUNITS-YES":
            handlerAOSRentersIsFiveOrMoreUnitsYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-ISFIVEORMOREUNITS-NO":
            handlerAOSRentersIsFiveOrMoreUnitsNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
         case "AOS-RENTERS-PERSONALITEMSVALUE":
            handlerAOSRentersPersonalItemsValue(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-VALIDATERENTERCUSTOMER":
            handlerAOSRenterValidCustomer(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-START":
            handlerAOSRetrieveInitiate(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-LASTNAME":
            handlerAOSRetrieveLastName(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-DOB":
            handlerAOSRetrieveDOB(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-EMAIL":
            handlerAOSRetrieveEmail(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-ZIP":
            handlerAOSRetrieveZipCode(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-EMAIL-YES":
            handleRetrieveQuoteEmailYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-EMAIL-NO":
            handleRetrieveQuoteEmailNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RETRIEVE-EMAIL-SEND":
            handleRetrieveQuoteEmailSend(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
            
            case "AOS-RENTERS-ISSPOUSEADDED-YES":
               handlerAOSRentersIsSpouseYes(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
          break;

          case "AOS-RENTERS-ISSPOUSEADDED-NO":
                handlerAOSRentersIsSpouseNo(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });

          break;

        case "AOS-RENTERS-SPOUSE-NAME":
        case "AOS-RENTERS-SPOUSE-LASTNAME":
            handlerAOSRentersSpouseInsuranceName(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        case "AOS-RENTERS-SPOUSE-DOB":
            handlerAOSRentersSpouseInsuranceDOB(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;

         case "AOS-RENTERS-SPOUSE-EMPSTATUS":
            handlerAOSRentersSpouseEmpStatus(body, deferred)
                .then(function (responseInfo) {
                    //employed, self employed, student, retired, unemployed, homemaker,military
                    deferred.resolve(responseInfo);
                });
            break;
      case "AOS-RENTERS-SPOUSE-GENDER":
            handlerAOSRentersSpouseGender(body, deferred)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;

        case "GET-LOCATION-PERMISSION":
            var permissionGranted = isPermissionGranted(body);
            handleGetLocationPermission(body, deferred, permissionGranted)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
            
            
        case "HELPINTENT":
        default:
            var message = "You can say hello to me!";
            responseBody.speech = message;
            responseBody.displayText = message;
            deferred.resolve(responseBody);
            break;
    }
    return deferred.promise;
};

//#region permission
function isPermissionGranted(body) {
    var permissionStatus = body.originalRequest.data.inputs[0].arguments[0].text_value;
    if (permissionStatus === "true") {
        return true;
    } else {
        return false;
    }


}
function handleGetLocationPermission(body, deferred, pemissionGranted) {
    var agentFindSpeechResp = {};
    if (pemissionGranted) {
        var permissionSeekingIntent = getPermissionSeekingIntent(body);
        if (permissionSeekingIntent) {
            var intentName = permissionSeekingIntent.parameters.IntentName;
            var deviceZipCode = getDeviceZipcode(body);
            processPermissionSeekingIntent(body, deferred, deviceZipCode, intentName)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
        }
    } else {
        agentFindSpeechResp.speech = "Request aborted , still you can find agent in manual way";
        agentFindSpeechResp.displayText = "Request aborted , still you can find agent in manual way";
        deferred.resolve(agentFindSpeechResp);
    }
    return deferred.promise;
}

function processPermissionSeekingIntent(body, deferred, deviceZipCode, intentName) {
    switch (intentName.toUpperCase()) {
        case "AGENT-FIND-BYCURRENTLOC":
            processAgentFindByCurrentLoc(body, deferred, deviceZipCode)
                .then(function (responseInfo) {
                    deferred.resolve(responseInfo);
                });
            break;
        default:
            break;


    }
    return deferred.promise;
}

function getPermissionSeekingIntent(body) {
    var incomingContexts = body.result.contexts;
    var permissionSeekingIntent = incomingContexts.find(function (contextObj) {
        if (contextObj.name === "PermissionSeekingIntent") {
            return contextObj;
        }
    });
    return permissionSeekingIntent;
}

function getDeviceZipcode(body) {
    if (body.originalRequest.data.device) {
        return body.originalRequest.data.device.location.zip_code;
    }
}
//#endregion

//#region ARS

function handleARSAgreementIntent(body, deferred) {
    var arsSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "ars"; });
    var sessionAttrs = getARSSessionAttributes(agFindCntx);


    ars.handleRoadServiceAgreementHandler(sessionAttrs)
        .then(function (roasServiceResponse) {
            arsSpeechResp.speech = roasServiceResponse.speechOutput.text;
            arsSpeechResp.displayText = roasServiceResponse.speechOutput.text;
            deferred.resolve(arsSpeechResp);
        });

    return deferred.promise;
}

function handleARSStartIntent(body, deferred) {
    var arsSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "ars"; });
    var sessionAttrs = getARSSessionAttributes(agFindCntx);


    ars.handleRoadServiceHandler(sessionAttrs)
        .then(function (roasServiceResponse) {
            arsSpeechResp.speech = roasServiceResponse.speechOutput.text;
            arsSpeechResp.displayText = roasServiceResponse.speechOutput.text;
            deferred.resolve(arsSpeechResp);
        });

    return deferred.promise;
}

function handleARSVehicleYMMIntent(body, deferred) {
    var arsSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "ars"; });
    var sessionAttrs = getARSSessionAttributes(agFindCntx);


    ars.handleRoadServiceYMMHandler(sessionAttrs)
        .then(function (roasServiceResponse) {
            arsSpeechResp.speech = roasServiceResponse.speechOutput.text;
            arsSpeechResp.displayText = roasServiceResponse.speechOutput.text;
            deferred.resolve(arsSpeechResp);
        });

    return deferred.promise;
}

function getARSSessionAttributes(contextInfo) {
    var sessionAttrs = {
        "serviceType": undefined, "cost": undefined,
        "keyLocation": undefined, "vehicle": {}, "vehicleLocation": undefined
    };

    if (contextInfo) {
        var serviceType = contextInfo.parameters["ars-service-type.original"];
        if (serviceType && serviceType.trim().length > 0) {
            sessionAttrs.serviceType = contextInfo.parameters["ars-service-type"];
        }
        var keyLocation = contextInfo.parameters["ars-key-loc.original"];
        if (keyLocation && keyLocation.trim().length > 0) {
            sessionAttrs.keyLocation = contextInfo.parameters["ars-key-loc"];
        }
        var vehicleLocation = contextInfo.parameters["location.original"];
        if (vehicleLocation && vehicleLocation.trim().length > 0) {
            sessionAttrs.vehicleLocation = contextInfo.parameters["location"];
            if (sessionAttrs.vehicleLocation.toUpperCase() === 'CURRENT') {
                sessionAttrs.vehicleLocation = "1500 Capitol Drive, Northbrook, IL 60060";
            }
        }
        var vehicleYear = contextInfo.parameters["vehicle-year.original"];
        if (vehicleYear && vehicleYear.trim().length > 0) {
            sessionAttrs.vehicleYear = contextInfo.parameters["vehicle-year"];
        }
        var vehicleMake = contextInfo.parameters["vehicle-make.original"];
        if (vehicleMake && vehicleMake.trim().length > 0) {
            sessionAttrs.vehicleMake = contextInfo.parameters["vehicle-make"];
        }
        var vehicleModel = contextInfo.parameters["vehicle-model.original"];
        if (vehicleModel && vehicleModel.trim().length > 0) {
            sessionAttrs.vehicleModel = contextInfo.parameters["vehicle-model"];
        }
    }

    return sessionAttrs;
}


//#endregion

//#region Renters insurance
function handlerAOSRentersInsuranceStart(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersInsuranceStart(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceName(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersInsuranceName(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceDOB(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersInsuranceDOB(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceAddr(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersInsuranceAddr(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceCityZip(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersInsuranceCityZip(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceInsuredAddrSame(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersInsuranceInsuredAddrSame(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersPhoneNumber(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersPhoneNumber(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}
function handlerAOSRentersPhoneNumberAuthorize(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
   
    aos.handlerRentersPhoneNumberAuthorize(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersEmailAddress(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersEmailAddress(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceInsuredAddrDiff(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersInsuranceInsuredAddrDiff(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersNewCityZip(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersNewCityZip(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersDiffAddress(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersDiffAddress(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersEmpStatus(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersEmpStatus(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersCrediHistoryAuthorize(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerCreditHistoryAuthorize(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
         });
 
     return deferred.promise;
 }

function handlerAOSRentersGender(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersGender(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersLivedMoreThanTwoYrsYes(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersLivedMoreThanTwoYrsYes(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersResidence(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersResidence(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersLivedMoreThanTwoYrsNo(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersLivedMoreThanTwoYrsNo(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersPrevCityZip(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersPrevCityZip(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersPrevStreetAddrs(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersPrevStreetAddrs(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsPrimaryResYes(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersIsPrimaryResYes(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsPrimaryResNo(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersIsPrimaryResNo(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersResidenceLocYes(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersResidenceLocYes(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersResidenceLocNo(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersResidenceLocNo(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsBusinessOperatedYes(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersIsBusinessOperatedYes(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsBusinessOperatedNo(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersIsBusinessOperatedNo(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersResidenceType(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersResidenceType(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsFiveOrMoreUnitsYes(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersIsFiveOrMoreUnitsYes(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsFiveOrMoreUnitsNo(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersIsFiveOrMoreUnitsNo(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersPersonalItemsValue(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRentersPersonalItemsValue(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRenterValidCustomer(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerRenterValidCustomer(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersInsuranceAddrCurLoc(body, deferred) {
    var rentersSpeechResp = {};
    rentersSpeechResp.speech = "To get your current location";
    rentersSpeechResp.displayText = "To get your current location";
    if (!rentersSpeechResp.contextOut) {
        rentersSpeechResp.contextOut = [];
    }
    rentersSpeechResp.contextOut.push({ "name": "PermissionSeekingIntent", "parameters": { "IntentName": "AOS-RENTERS-CURADDR-LOC" } });
    deferred.resolve(rentersSpeechResp);
    return deferred.promise;
}

function getAOSRentersSessionAttributes(contextInfo) {
    var sessionAttrs = {
        "firstName": undefined,
        "lastName": undefined,
        "middleName":undefined,
        "dob": undefined,
        "addrLine1": undefined,
        "city": undefined,
        "zip": undefined,
        "IsInsuredAddrSame": undefined,
        "phoneNumber" : undefined,
        "isAuthorize" : undefined,
        "emailAddress" : undefined,
        "businessoutofresidence" : undefined,
        "employmentStatus" : undefined,
        "unitsInBuilding" : undefined,
        "locatedInDormOrMilitaryBarracks" : undefined,
        "residenceBuildingType" : undefined,
        "primaryResidence" : undefined,
        "isCurrentAddressSameAsInsuredAddress" : undefined,
        "gender" : undefined,
        "livedmorethantwo" : undefined,
        "transactionToken" : {},
        "agentDetails" :{},
        "isSpouseAdded" : undefined,
        "spousefirstName": undefined,
        "spouselastName": undefined,
        "spousemiddleName":undefined,
        "spouseDob": undefined,
        "spouseEmpStatus" : undefined,
        "spouseGender" : undefined,
        "newcity" : undefined,
        "newzip" : undefined,
        "newaddrLine1" : undefined,
        "prevzipcode" : undefined,
        "prevstate" : undefined,
        "prevcity" : undefined,
        "prevaddrLine1" : undefined,
         "isCreditAuthorized" : undefined
    };

    if (contextInfo) {
//         var firstName = contextInfo.parameters["given-name.original"];
//         if (firstName && firstName.length > 0) {
//             sessionAttrs.firstName = contextInfo.parameters["given-name"];
//         }
//         if(firstName && firstName.length>1){
//             sessionAttrs.lastName = contextInfo.parameters["given-name.original"][1];
//         }
        
        var givenname = contextInfo.parameters["given-name.original"];
        if (givenname && givenname.length > 0) {
            givenname = contextInfo.parameters["given-name"];
            var arr = givenname.split(" ");
            if(arr.length <=2){
            sessionAttrs.firstName = arr[0];
            sessionAttrs.lastName = arr[1];
           }
           else{
               sessionAttrs.firstName = arr[0];
               sessionAttrs.middleName = arr[1];
               sessionAttrs.lastName = arr[2];
           }
        }
        var lastName = contextInfo.parameters["last-name.original"];
        if (lastName && lastName.trim().length > 0) {
            sessionAttrs.lastName = contextInfo.parameters["last-name"];
        }
        var dob = contextInfo.parameters["dob.original"];
        if (dob && dob.trim().length > 0) {
            sessionAttrs.dob = contextInfo.parameters["dob"];
        }
        var addrLine1 = contextInfo.parameters["address.original"];
        if (addrLine1 && addrLine1.trim().length > 0) {
            sessionAttrs.addrLine1 = contextInfo.parameters["address"];
        }
        var city = contextInfo.parameters["geo-city.original"];
        if (city && city.trim().length > 0) {
            sessionAttrs.city = contextInfo.parameters["geo-city"];
        }
        var zip = contextInfo.parameters["zip.original"];
        if (zip && zip.trim().length > 0) {
            sessionAttrs.zip = contextInfo.parameters["zip"];
            if (sessionAttrs.zip.length === 4) {
                sessionAttrs.zip = "0" + sessionAttrs.zip;
            }
        }
        var newaddrLine1 = contextInfo.parameters["newaddress.original"];
        if (newaddrLine1 && newaddrLine1.trim().length > 0) {
            sessionAttrs.newaddrLine1 = contextInfo.parameters["newaddress"];
        }
        var newcity = contextInfo.parameters["newgeo-city.original"];
        if (newcity && newcity.trim().length > 0) {
            sessionAttrs.newcity = contextInfo.parameters["newgeo-city"];
        }
        var newzip = contextInfo.parameters["newzip.original"];
        if (newzip && newzip.trim().length > 0) {
            sessionAttrs.newzip = contextInfo.parameters["newzip"];
            if (sessionAttrs.newzip.length === 4) {
                sessionAttrs.newzip = "0" + sessionAttrs.newzip;
            }
        }
        var phoneNumber = contextInfo.parameters["phone-number.original"];
        if (phoneNumber && phoneNumber.trim().length > 0) {
            sessionAttrs.phoneNumber = contextInfo.parameters["phone-number"];           
        }
         var isAuthorize = contextInfo.parameters["isAuthorize.original"];
        if (isAuthorize && isAuthorize.trim().length > 0) {
            sessionAttrs.isAuthorize = contextInfo.parameters["isAuthorize"];           
        }
         var emailAddress = contextInfo.parameters["email.original"];
        if (emailAddress && emailAddress.trim().length > 0) {
            sessionAttrs.emailAddress = contextInfo.parameters["email"];           
        }
        var businessoutofresidence = contextInfo.parameters["isBusinessOperated.original"];
        if (businessoutofresidence && businessoutofresidence.trim().length > 0) {
            sessionAttrs.businessoutofresidence = contextInfo.parameters["isBusinessOperated"];           
        }
        var employmentStatus = contextInfo.parameters["aos-renters-employmentType.original"];
        if (employmentStatus && employmentStatus.trim().length > 0) {
            sessionAttrs.employmentStatus = contextInfo.parameters["aos-renters-employmentType"];           
        }
        var unitsInBuilding = contextInfo.parameters["isfiveormoreunits.original"];
        if (unitsInBuilding && unitsInBuilding.trim().length > 0) {
            sessionAttrs.unitsInBuilding = contextInfo.parameters["isfiveormoreunits"];           
        }
        var locatedInDormOrMilitaryBarracks = contextInfo.parameters["residenceLocation.original"];
        if (locatedInDormOrMilitaryBarracks && locatedInDormOrMilitaryBarracks.trim().length > 0) {
            sessionAttrs.locatedInDormOrMilitaryBarracks = contextInfo.parameters["residenceLocation"];           
        }
        var personalItemsValue = contextInfo.parameters["valueofPersonalItems.original"];
        if (personalItemsValue && personalItemsValue.trim().length > 0) {
            sessionAttrs.personalItemsValue = contextInfo.parameters["valueofPersonalItems"];           
        }        
        var residenceBuildingType = contextInfo.parameters["aos-renters-typeOfBuilding.original"];
        if (residenceBuildingType && residenceBuildingType.trim().length > 0) {
            sessionAttrs.residenceBuildingType = contextInfo.parameters["aos-renters-typeOfBuilding"];           
        }
        var primaryResidence = contextInfo.parameters["isprimaryresidence.original"];
        if (primaryResidence && primaryResidence.trim().length > 0) {
            sessionAttrs.primaryResidence = contextInfo.parameters["isprimaryresidence"];           
        }
        var isCurrentAddressSameAsInsuredAddress = contextInfo.parameters["IsInsuredAddrSame.original"];
        if (isCurrentAddressSameAsInsuredAddress && isCurrentAddressSameAsInsuredAddress.trim().length > 0) {
            sessionAttrs.isCurrentAddressSameAsInsuredAddress = contextInfo.parameters["IsInsuredAddrSame"];           
        }
        var gender = contextInfo.parameters["aos-gender.original"];
        if (gender && gender.trim().length > 0) {
            sessionAttrs.gender = contextInfo.parameters["aos-gender"];           
        }        
        var livedmorethantwo = contextInfo.parameters["livedmorethantwo.original"];
        if (livedmorethantwo && livedmorethantwo.trim().length > 0) {
            sessionAttrs.livedmorethantwo = contextInfo.parameters["livedmorethantwo"];           
        }
        if (contextInfo.parameters.transactionToken) {
            sessionAttrs.transactionToken = contextInfo.parameters.transactionToken;
        }
        if (contextInfo.parameters.agentDetails) {
            sessionAttrs.agentDetails = contextInfo.parameters.agentDetails;
        }
         if (contextInfo.parameters.creditHit != null) {
            sessionAttrs.creditHit = contextInfo.parameters.creditHit;
        }
         if (contextInfo.parameters.isRenterReOrderData != null) {
            sessionAttrs.isRenterReOrderData = contextInfo.parameters.isRenterReOrderData;
        }
         if (contextInfo.parameters.isValidRenterCustomer != null) {
            sessionAttrs.isValidRenterCustomer = contextInfo.parameters.isValidRenterCustomer;
        }
        var isSpouseAdded = contextInfo.parameters["isSpouseAdded.original"];
        if (isSpouseAdded && isSpouseAdded.trim().length > 0) {
            sessionAttrs.isSpouseAdded = contextInfo.parameters["isSpouseAdded"];           
        }
//          var spousefirstName = contextInfo.parameters["spousefirstName.original"];
//         if (spousefirstName && spousefirstName.length > 0) {
//             sessionAttrs.spousefirstName = contextInfo.parameters["spousefirstName"];
//         }
//         if(spousefirstName && spousefirstName.length>1){
//             sessionAttrs.spouselastName = contextInfo.parameters["spousefirstName.original"][1];
//         }
        var spouseName = contextInfo.parameters["spouse-name.original"];
        if (spouseName && spouseName.length > 0) {
            spouseName = contextInfo.parameters["spouse-name"];
            var arr = spouseName.split(" ");
            if(arr.length <=2){
            sessionAttrs.spousefirstName = arr[0];
            sessionAttrs.spouselastName = arr[1];
           }
           else{
               sessionAttrs.spousefirstName = arr[0];
               sessionAttrs.spouselastName = arr[2];
               sessionAttrs.spousemiddleName = arr[1];
           }
        }
        
        var spouselastName = contextInfo.parameters["spouselastName.original"];
        if (spouselastName && spouselastName.trim().length > 0) {
            sessionAttrs.spouselastName = contextInfo.parameters["spouselastName"];
        }
        var spouseDob = contextInfo.parameters["spouseDob.original"];
        if (spouseDob && spouseDob.trim().length > 0) {
            sessionAttrs.spouseDob = contextInfo.parameters["spouseDob"];
        }
        var spouseEmpStatus = contextInfo.parameters["spouseEmpStatus.original"];
        if (spouseEmpStatus && spouseEmpStatus.trim().length > 0) {
            sessionAttrs.spouseEmpStatus = contextInfo.parameters["spouseEmpStatus"];           
        }
        var spouseGender = contextInfo.parameters["spouseGender.original"];
        if (spouseGender && spouseGender.trim().length > 0) {
            sessionAttrs.spouseGender = contextInfo.parameters["spouseGender"];           
        }
        var prevaddrLine1 = contextInfo.parameters["prevaddress.original"];
        if (prevaddrLine1 && prevaddrLine1.trim().length > 0) {
            sessionAttrs.prevaddrLine1 = contextInfo.parameters["prevaddress"];
        }
        var isCreditAuthorized = contextInfo.parameters["isCreditAuthorized.original"];
         if (isCreditAuthorized && isCreditAuthorized.trim().length > 0) {
             sessionAttrs.isCreditAuthorized = contextInfo.parameters["isCreditAuthorized"];
         }
        var prevcity = contextInfo.parameters["prevcity.original"];
        if (prevcity && prevcity.trim().length > 0) {
            sessionAttrs.prevcity = contextInfo.parameters["prevcity"];
        }
        var prevzipcode = contextInfo.parameters["prevzipcode.original"];
        if (prevzipcode && prevzipcode.trim().length > 0) {
            sessionAttrs.prevzip = contextInfo.parameters["prevzipcode"];
            if (sessionAttrs.prevzip.length === 4) {
                sessionAttrs.prevzip = "0" + sessionAttrs.prevzip;
            }
        }
         if (contextInfo.parameters.prevstate != null) {
            sessionAttrs.prevstate = contextInfo.parameters.prevstate;
        }    
        if(contextInfo.parameters["IsInsuredAddrSame"] === false || contextInfo.parameters["IsInsuredAddrSame"] === "false" ){
            sessionAttrs.IsInsuredAddrSame = false;
        }
        else{
            sessionAttrs.IsInsuredAddrSame = true;
        }
        if(contextInfo.parameters["isSpouseAdded"] === true || contextInfo.parameters["isSpouseAdded"] === "true" ){
            sessionAttrs.spouseAdded = true;
        }
        else{
            sessionAttrs.spouseAdded = false;
        }
        if(contextInfo.parameters["livedmorethantwo"] === false || contextInfo.parameters["livedmorethantwo"] === "false" ){
            sessionAttrs.livedmorethantwo = false;
        }
        else{
            sessionAttrs.livedmorethantwo = true;
        }
        

    }

    return sessionAttrs;
}

//#endregion


//#region Agent

function handleWelcomeIntent(body, deferred) {
    var agentFindSpeechResp = {};
    agentFindSpeechResp.speech = "Welcome to Allstate. I can help find an agent, get you an insurance. I can even help you with Road Side Assistance.";
    agentFindSpeechResp.displayText = agentFindSpeechResp.speech;
    deferred.resolve(agentFindSpeechResp);
    return deferred.promise;
}

function handleAgentFindEmailYes(body, deferred) {
    var agentFindSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "agentfindbyzip"; });
    var sessionAttrs = getAgentSessionAttributes(agFindCntx);


    aos.handleAgentFindEmailYesIntent(sessionAttrs)
        .then(function (agentFindSpeechResponse) {
            agentFindSpeechResp.speech = agentFindSpeechResponse.speechOutput.text;
            agentFindSpeechResp.displayText = agentFindSpeechResponse.speechOutput.text;
            deferred.resolve(agentFindSpeechResp);
        });

    return deferred.promise;
}

function handleAgentFindEmailNo(body, deferred) {
    var agentFindSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "agentfindbyzip"; });
    var sessionAttrs = getAgentSessionAttributes(agFindCntx);


    aos.handleAgentFindEmailNoIntent(sessionAttrs)
        .then(function (agentFindSpeechResponse) {
            agentFindSpeechResp.speech = agentFindSpeechResponse.speechOutput.text;
            agentFindSpeechResp.displayText = agentFindSpeechResponse.speechOutput.text;
            deferred.resolve(agentFindSpeechResp);
        });

    return deferred.promise;

}

function handleAgentFindEmailSend(body, deferred) {
    var agentFindSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "agentfindbyzip"; });
    var sessionAttrs = getAgentSessionAttributes(agFindCntx);

    console.log("handleAgentFindEmailSend - start");

    aos.handleAgentFindEmailSendIntent(sessionAttrs)
        .then(function (agentFindSpeechResponse) {
            agentFindSpeechResp.speech = agentFindSpeechResponse.speechOutput.text;
            agentFindSpeechResp.displayText = agentFindSpeechResponse.speechOutput.text;
            console.log("handleAgentFindEmailSend - end");
            deferred.resolve(agentFindSpeechResp);
        });

    return deferred.promise;
}

function handleAgentFindByZip(body, deferred) {
    var agentFindSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "agent"; });
    var sessionAttrs = getAgentSessionAttributes(agFindCntx);

    if (sessionAttrs.zip) {
        aos.handleAgentFindByZipIntent(sessionAttrs)
            .then(function (agentFindSpeechResponse) {
                agentFindSpeechResp.speech = agentFindSpeechResponse.speechOutput.text;
                agentFindSpeechResp.displayText = agentFindSpeechResponse.speechOutput.text;
                agentFindSpeechResp.contextOut = [{ "name": "AgentFindByZip", "parameters": sessionAttrs }];
                deferred.resolve(agentFindSpeechResp);
            });
    }
    return deferred.promise;
}

function handleAgentFindIntent(body, deferred) {
    var agentFindSpeechResp = {};
    var result = body.result;
    var agFindCntx = result.contexts.find(function (curCntx) { return curCntx.name === "agent"; });
    var sessionAttrs = getAgentSessionAttributes(agFindCntx);

    aos.handleAgentFindRequest(sessionAttrs)
        .then(function (agentFindSpeechResponse) {
            agentFindSpeechResp.speech = agentFindSpeechResponse.speechOutput.text;
            agentFindSpeechResp.displayText = agentFindSpeechResponse.speechOutput.text;
            deferred.resolve(agentFindSpeechResp);
        });

    return deferred.promise;
}

function getAgentSessionAttributes(contextInfo) {
    var sessionAttrs = { "zip": undefined, "email": undefined, "agent": {} };
    if (contextInfo) {
        var zip = contextInfo.parameters["zip.original"];
        if (zip && zip.trim().length > 0) {
            sessionAttrs.zip = contextInfo.parameters["zip"];
        }
        var email = contextInfo.parameters["email.original"];
        if (email && email.trim().length > 0) {
            sessionAttrs.email = email;
        }
        if (contextInfo.parameters.agent) {
            sessionAttrs.agent = contextInfo.parameters.agent;
        }
    }

    return sessionAttrs;
}

//#endregion

//#region RetrieveQuote
function handlerAOSRetrieveInitiate(body, deferred) {
    var retrieveWelcomeSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);

    aos.handleRetrieveQuoteStart(sessionAttrs)
        .then(function (retrieveSpeechResponse) {
            retrieveWelcomeSpeechResp.speech = retrieveSpeechResponse.speechOutput.text;
            retrieveWelcomeSpeechResp.displayText = retrieveSpeechResponse.speechOutput.text;
            deferred.resolve(retrieveWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRetrieveLastName(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);

    aos.handleRetrieveQuoteLastName(sessionAttrs)
        .then(function (retrieveSpeechResponse) {
            retrieveSpeechResp.speech = retrieveSpeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrieveSpeechResponse.speechOutput.text;
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRetrieveDOB(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);

    aos.handleRetrieveQuoteDOB(sessionAttrs)
        .then(function (retrievespeechResponse) {
            retrieveSpeechResp.speech = retrievespeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrievespeechResponse.speechOutput.text;
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRetrieveEmail(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);

    aos.handleRetrieveQuoteEmail(sessionAttrs)
        .then(function (retrievespeechResponse) {
            retrieveSpeechResp.speech = retrievespeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrievespeechResponse.speechOutput.text;
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRetrieveZipCode(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);

    aos.handleRetrieveQuoteZipCode(sessionAttrs)
        .then(function (retrievespeechResponse) {
            retrieveSpeechResp.speech = retrievespeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrievespeechResponse.speechOutput.text;
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;
}

function handleRetrieveQuoteEmailYes(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);


    aos.handleRetrieveQuoteEmailYesIntent(sessionAttrs)
        .then(function (retrieveQuoteSpeechResponse) {
            retrieveSpeechResp.speech = retrieveQuoteSpeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrieveQuoteSpeechResponse.speechOutput.text;
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;
}

function handleRetrieveQuoteEmailNo(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);


    aos.handleAgentFindEmailNoIntent(sessionAttrs)
        .then(function (retrieveQuoteSpeechResponse) {
            retrieveSpeechResp.speech = retrieveQuoteSpeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrieveQuoteSpeechResponsess.speechOutput.text;
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;

}

function handleRetrieveQuoteEmailSend(body, deferred) {
    var retrieveSpeechResp = {};
    var result = body.result;
    var retrieveCntx = result.contexts.find(function (curCntx) { return curCntx.name === "aos-retv"; });
    var sessionAttrs = getRetrieveQuoteSessionAttributes(retrieveCntx);

    console.log("handleRetrieveQuoteEmailSend - start");

    aos.handleRetrieveQuoteEmailSendIntent(sessionAttrs)
        .then(function (retrieveQuoteSpeechResponse) {
            retrieveSpeechResp.speech = retrieveQuoteSpeechResponse.speechOutput.text;
            retrieveSpeechResp.displayText = retrieveQuoteSpeechResponse.speechOutput.text;
            console.log("handleRetrieveQuoteEmailSend - end");
            deferred.resolve(retrieveSpeechResp);
        });

    return deferred.promise;
}

function getRetrieveQuoteSessionAttributes(contextInfo) {
    var sessionQuoteAttrs = { "zipcode": undefined, "email": undefined, "lastname": undefined, "dob": undefined, "quotedetails": {} };
    if (contextInfo) {
        var zip = contextInfo.parameters["zipcode.original"];
        if (zip && zip.trim().length > 0) {
            sessionQuoteAttrs.zipcode = contextInfo.parameters["zipcode"];
        }
        var email = contextInfo.parameters["email.original"];
        if (email && email.trim().length > 0) {
            sessionQuoteAttrs.email = contextInfo.parameters["email"];
        }
        var lastname = contextInfo.parameters["lastname.original"];
        if (lastname && lastname.trim().length > 0) {
            sessionQuoteAttrs.lastname = contextInfo.parameters["lastname"];
        }
        var dob = contextInfo.parameters["dob.original"];
        if (dob && dob.trim().length > 0) {
            sessionQuoteAttrs.dob = contextInfo.parameters["dob"];
        }
        if (contextInfo.parameters.quotedetails) {
            sessionQuoteAttrs.quotedetails = contextInfo.parameters.quotedetails;
        }
    }

    return sessionQuoteAttrs;
}


//#endregion 

//#region Tidepooler
function handleTDCityIntent(body, deferred) {
    var dialogTideSpeechResponse = {};
    var result = body.result;
    var tdPoolerCntx = result.contexts.find(function (curCntx) { return curCntx.name === "tide-pooler"; });
    var sessionAttrs = getTDSessionAttributes(tdPoolerCntx);

    if (sessionAttrs.city) {
        TidePooler.handleCityDialogRequest(sessionAttrs.city, sessionAttrs)
            .then(function (poolerCitySpeechResponse) {
                dialogTideSpeechResponse.speech = poolerCitySpeechResponse.speechOutput.text;
                dialogTideSpeechResponse.displayText = poolerCitySpeechResponse.speechOutput.text;
                deferred.resolve(dialogTideSpeechResponse);
            });
    }

    return deferred.promise;
}

function handleTDDateIntent(body, deferred) {
    var dialogTideSpeechResponse = {};
    var result = body.result;
    var tdPoolerCntx = result.contexts.find(function (curCntx) { return curCntx.name === "tide-pooler"; });
    var sessionAttrs = getTDSessionAttributes(tdPoolerCntx);

    if (sessionAttrs.date) {
        TidePooler.handleDateDialogRequest(sessionAttrs.date, sessionAttrs)
            .then(function (poolerDateSpeechResponse) {
                dialogTideSpeechResponse.speech = poolerDateSpeechResponse.speechOutput.text;
                dialogTideSpeechResponse.displayText = poolerDateSpeechResponse.speechOutput.text;
                deferred.resolve(dialogTideSpeechResponse);
            });
    }


    return deferred.promise;
}

function getTDSessionAttributes(contextInfo) {
    var sessionAttrs = { "city": undefined, "date": undefined };

    if (contextInfo) {
        var cityOrg = contextInfo.parameters['geo-city.original'];
        var dateOrg = contextInfo.parameters['date.original'];
        if (cityOrg && cityOrg.length > 0) {
            sessionAttrs.city = contextInfo.parameters['geo-city'];
        }
        if (dateOrg && dateOrg.length > 0) {
            sessionAttrs.date = contextInfo.parameters.date;
        }
    }

    return sessionAttrs;
}

function dialogTideIntent(body, deferred) {
    var dialogTideSpeechResponse;
    var result = body.result;
    var city = result.parameters['geo-city'];
    var date = result.parameters.date;
    if (city) {
        TidePooler.handleCityDialogRequest(city, {})
            .then(function (poolerCitySpeechResponse) {
                dialogTideSpeechResponse = processPoolerSpeechResp(poolerCitySpeechResponse, body);
                deferred.resolve(dialogTideSpeechResponse);
            });
    } else if (date) {
        TidePooler.handleDateDialogRequest(date, {})
            .then(function (poolerDateSpeechResponse) {
                dialogTideSpeechResponse = processPoolerSpeechResp(poolerDateSpeechResponse, body);
                deferred.resolve(dialogTideSpeechResponse);
            });

    } else {
        TidePooler.handleNoSlotDialogRequest(body)
            .then(function (noSlotSpeechResponse) {
                deferred.resolve(noSlotSpeechResponse);
            });
    }
    return deferred.promise;
}

function processPoolerSpeechResp(poolerDateSpeechResponse, body) {
    var responseInfo;


    return responseInfo;
}
//#endregion

//#region SPOUSE

function handlerAOSRentersIsSpouseYes(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerAOSRentersIsSpouseYes(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            //rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}


function handlerAOSRentersSpouseInsuranceName(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersSpouseInsuranceName(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}
function handlerAOSRentersSpouseInsuranceDOB(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handleRentersSpouseInsuranceDOB(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersSpouseEmpStatus(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersSpouseEmpStatus(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersSpouseGender(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);
    aos.handlerRentersSpouseGender(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

function handlerAOSRentersIsSpouseNo(body, deferred) {
    var rentersWelcomeSpeechResp = {};
    var result = body.result;
    var rentersCntx = result.contexts.find(function (curCntx) { return curCntx.name === "renters"; });
    var sessionAttrs = getAOSRentersSessionAttributes(rentersCntx);

    aos.handlerAOSRentersIsSpouseNo(sessionAttrs)
        .then(function (renterspeechResponse) {
            rentersWelcomeSpeechResp.speech = renterspeechResponse.speechOutput.text;
            rentersWelcomeSpeechResp.displayText = renterspeechResponse.speechOutput.text;
            //rentersWelcomeSpeechResp.contextOut = [{ "name": "renters", "parameters": sessionAttrs }];
            deferred.resolve(rentersWelcomeSpeechResp);
        });

    return deferred.promise;
}

//#endregion



module.exports = new ApiAiIntentHandler();


