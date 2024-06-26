var firstStepNext = document.getElementById('firstStepNext');
firstStepNext.disabled = true;
var secondStepNext = document.getElementById('secondStepNext');
secondStepNext.disabled = true;
var submitBtn = document.getElementById('submitBtn');
submitBtn.disabled = true;

function validatetCityState(field) {
    var parentFieldDiv = field.closest('.field');
    var lastSpan = parentFieldDiv.querySelector('.errorInfo');
    var invalidChars = /[^a-zA-Z]/;
    if (field.value.length > 0) {
        if (invalidChars.test(field.value)) {
            lastSpan.style.display = 'contents';
            field.className = 'form-control field_error';
            field.nextElementSibling.className = 'icon-warning-sign';
            parentFieldDiv.style.backgroundColor = '#FFF1FF';
            return false;
            //firstSteperrorArray.push(errorInfos);

        } else {
            lastSpan.style.display = 'none';
            field.className = 'form-control field_success';
            field.nextElementSibling.className = 'icon-ok';
            parentFieldDiv.style.backgroundColor = '#fff';
            //firstSteperrorArray.pop();
            return true;
        }
    } else {
        lastSpan.style.display = 'none';
        field.className = 'form-control';
        field.nextElementSibling.className = '';
        parentFieldDiv.style.backgroundColor = '#fff';
        return true;
        //firstSteperrorArray.pop();
    }
    //checkFirstStepErrorArray();
}

function validatetZip(field) {
    var parentFieldDiv = field.closest('.field');
    var lastSpan = parentFieldDiv.querySelector('.errorInfo');
    if (field.value.length > 0) {
        if (validator.isNumeric(field.value, 'en-AU')) {
            lastSpan.style.display = 'none';
            field.className = 'form-control field_success';
            field.nextElementSibling.className = 'icon-ok';
            parentFieldDiv.style.backgroundColor = '#fff';
            //firstSteperrorArray.pop();
            return true;
        } else {
            lastSpan.style.display = 'contents';
            field.className = 'form-control field_error';
            field.nextElementSibling.className = 'icon-warning-sign';
            parentFieldDiv.style.backgroundColor = '#FFF1FF';
            //firstSteperrorArray.push(errorInfos);
            return false;
        }
    } else {
        lastSpan.style.display = 'none';
        field.className = 'form-control';
        field.nextElementSibling.className = '';
        parentFieldDiv.style.backgroundColor = '#fff';
        return true;
        //firstSteperrorArray.pop();
    }
    //checkFirstStepErrorArray();
}

document.getElementById('address').addEventListener('input', function () {
    var address = this.value;
    fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=' + address)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dataList = document.getElementById('addressList');
            dataList.innerHTML = "";
            if (data.length > 0) {
                data.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item.display_name;
                    dataList.appendChild(option);
                });
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

document.getElementById('propertyAddress').addEventListener('input', function () {
    var address = this.value;
    fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=' + address)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dataList = document.getElementById('propertyAddressList');
            dataList.innerHTML = "";
            if (data.length > 0) {
                data.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item.display_name;
                    dataList.appendChild(option);
                });
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});


document.getElementById('OwnerAddress').addEventListener('input', function () {
    var address = this.value;
    fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=' + address)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dataList = document.getElementById('OwnerAddressList');
            dataList.innerHTML = "";
            if (data.length > 0) {
                data.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item.display_name;
                    dataList.appendChild(option);
                });
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

document.getElementById('address').addEventListener('change', function () {
    var selectedAddress = this.value;

    fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=' + selectedAddress)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length > 0) {
                var addressObj = data[0].address;
                document.getElementById('city').value = addressObj.city;
                document.getElementById('state').value = addressObj.state;
                document.getElementById('zip').value = addressObj.postcode;
                document.getElementById('address').value = addressObj.road;

                validatetCityState(document.getElementById('state'));
                validatetCityState(document.getElementById('city'));
                validatetZip(document.getElementById('zip'));
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

document.getElementById('propertyAddress').addEventListener('change', function () {
    var selectedAddress = this.value;

    fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=' + selectedAddress)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length > 0) {
                var addressObj = data[0].address;
                document.getElementById('propertyCity').value = addressObj.city;
                document.getElementById('propertyState').value = addressObj.state;
                document.getElementById('propertyZip').value = addressObj.postcode;
                document.getElementById('propertyAddress').value = addressObj.road;
                validatetCityState(document.getElementById('propertyState'));
                validatetCityState(document.getElementById('propertyCity'));
                validatetZip(document.getElementById('propertyZip'));
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

document.getElementById('OwnerAddress').addEventListener('change', function () {
    var selectedAddress = this.value;
    var firstStepNext = document.getElementById('firstStepNext');
    fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=' + selectedAddress)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length > 0) {
                var addressObj = data[0].address;
                document.getElementById('OwnerCity').value = addressObj.city;
                document.getElementById('OwnerState').value = addressObj.state;
                document.getElementById('OwnerZip').value = addressObj.postcode;
                document.getElementById('OwnerAddress').value = addressObj.road;
                var resCityState = validatetCityState(document.getElementById('OwnerState'));
                var resCityState = validatetCityState(document.getElementById('OwnerCity'));
                var resZip = validatetZip(document.getElementById('OwnerZip'));
                if (resCityState && resZip) {
                    firstStepNext.disabled = false;
                } else {

                }
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    var resFirstName = false;
    var resLastName = false;
    var resEmail = false;
    var resPhone = false;
    var resAddress = true;
    var resCityState = true;
    var resZip = true;

    document.querySelectorAll('input').forEach(function (input) {
        input.addEventListener('blur', function () {
            if (input.id === "firstName" || input.id === "OwnerFirstName") {
                resFirstName = validatetName(input);
            }
            if (input.id === "lastName" || input.id === "OwnerLastName") {
                resLastName = validatetName(input);
            }
            if (input.id === 'email' || input.id === 'OwnerEmail') {
                resEmail = validatetEmail(input);
            }
            if (input.id === 'phone' || input.id === 'OwnerPhone') {
                resPhone = validatetPhone(input);
            }
            if (input.id === 'address' || input.id === "propertyAddress" || input.id === "OwnerAddress") {
                resAddress = validatetAddress(input);
            }
            if (input.id === 'city' || input.id === 'state' || input.id === 'propertyState' || input.id === 'propertyCity' || input.id === 'OwnerCity' || input.id === 'OwnerState') {
                resCityState = validatetCityState(input);
            }
            if (input.id === 'zip' || input.id === 'propertyZip' || input.id === 'OwnerZip') {
                resZip = validatetZip(input);
            }
            if (resFirstName && resLastName && resEmail && resPhone && resAddress && resCityState && resZip) {
                console.log("here is here");
                firstStepNext.disabled = false;
            } else {
                console.log("here is hhhh");
                firstStepNext.disabled = true;
            }
        });
    });

    function validatetName(field) {
        var parentFieldDiv = field.closest('.field');
        var lastSpan = parentFieldDiv.querySelector('.errorInfo');
        var invalidChars = /[^a-zA-Z]/;
        if (field.value.length === 0) {
            field.className = 'form-control field_error';
            field.nextElementSibling.className = 'icon-warning-sign';
            parentFieldDiv.style.backgroundColor = '#FFF1FF';
            //firstSteperrorArray.push(errorInfos);
            return false;
        } else {
            if (invalidChars.test(field.value)) {
                lastSpan.style.display = 'contents';
                field.className = 'form-control field_error';
                field.nextElementSibling.className = 'icon-warning-sign';
                parentFieldDiv.style.backgroundColor = '#FFF1FF';
                //firstSteperrorArray.push(errorInfos);
                return false;
            } else {
                lastSpan.style.display = 'none';
                field.className = 'form-control field_success';
                field.nextElementSibling.className = 'icon-ok';
                parentFieldDiv.style.backgroundColor = '#fff';
                return true;
                //firstSteperrorArray.pop();
            }
        }
        //checkFirstStepErrorArray();
    }

    function validatetEmail(field) {
        var parentFieldDiv = field.closest('.field');
        var lastSpan = parentFieldDiv.querySelector('.errorInfo');
        if (validator.isEmail(field.value)) {
            lastSpan.style.display = 'none';
            field.className = 'form-control field_success';
            field.nextElementSibling.className = 'icon-ok';
            parentFieldDiv.style.backgroundColor = '#fff';
            //firstSteperrorArray.pop();
            return true;
        } else {
            lastSpan.style.display = 'contents';
            field.className = 'form-control field_error';
            field.nextElementSibling.className = 'icon-warning-sign';
            parentFieldDiv.style.backgroundColor = '#FFF1FF';
            //firstSteperrorArray.push(errorInfos);
            return false;
        }
        //checkFirstStepErrorArray();
    }

    function validatetPhone(field) {
        var parentFieldDiv = field.closest('.field');
        var lastSpan = parentFieldDiv.querySelector('.errorInfo');
        if (validator.isMobilePhone(field.value, 'en-AU')) {
            lastSpan.style.display = 'none';
            field.className = 'form-control field_success';
            field.nextElementSibling.className = 'icon-ok';
            parentFieldDiv.style.backgroundColor = '#fff';
            firstSteperrorArray.pop();
            return true;
        } else {
            lastSpan.style.display = 'contents';
            field.className = 'form-control field_error';
            field.nextElementSibling.className = 'icon-warning-sign';
            parentFieldDiv.style.backgroundColor = '#FFF1FF';
            firstSteperrorArray.push(errorInfos);
            return false;
        }
        //checkFirstStepErrorArray();
    }

    function validatetAddress(field) {
        var parentFieldDiv = field.closest('.field');
        var lastSpan = parentFieldDiv.querySelector('.errorInfo');
        var invalidChars = /[^a-zA-Z0-9 ]/;
        if (field.value.length > 0) {
            if (invalidChars.test(field.value)) {
                lastSpan.style.display = 'contents';
                field.className = 'form-control field_error';
                field.nextElementSibling.className = 'icon-warning-sign';
                parentFieldDiv.style.backgroundColor = '#FFF1FF';
                return false;
                //firstSteperrorArray.push(errorInfos);
            } else {
                lastSpan.style.display = 'none';
                field.className = 'form-control field_success';
                field.nextElementSibling.className = 'icon-ok';
                parentFieldDiv.style.backgroundColor = '#fff';
                //firstSteperrorArray.pop();
                return true;
            }
        } else {
            lastSpan.style.display = 'none';
            field.className = 'form-control';
            field.nextElementSibling.className = '';
            parentFieldDiv.style.backgroundColor = '#fff';
            //firstSteperrorArray.pop();
            return true;
        }
        //console.log(firstSteperrorArray);
        //checkFirstStepErrorArray();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('multi-step-form');
    // Get the radio buttons and the element to show the price
    var allPlanRadio = document.getElementById('allPlan');
    var plumbingOnlyRadio = document.getElementById('plumbingOnly');
    var totalElement = document.getElementById('total');
    var priceElement = document.getElementById('price');
    var priceText = priceElement.querySelector('span');
    var parentTotalDiv = totalElement.closest('.col-12');
    var parentPriceDiv = priceElement.closest('.col-12');
    var parentFieldDiv = allPlanRadio.closest('.planGroup');
    var lastSpan = parentFieldDiv.querySelector('.errorInfo');
    if (allPlanRadio.checked || plumbingOnlyRadio.checked) {
        parentFieldDiv.style.backgroundColor = '#fff';
    } else {
        parentFieldDiv.style.backgroundColor = '#FFF1FF';
        lastSpan.style.display = 'contents';
    }

    // Function to toggle the price display
    function togglePriceDisplay() {
        if (allPlanRadio.checked) {
            priceText.textContent = "$65";
            parentFieldDiv.style.backgroundColor = '#fff';
            lastSpan.style.display = 'none';
        }
        if (plumbingOnlyRadio.checked) {
            priceText.textContent = "$15";
            parentFieldDiv.style.backgroundColor = '#fff';
            lastSpan.style.display = 'none';
        }
        if (allPlanRadio.checked || plumbingOnlyRadio.checked) {
            parentTotalDiv.style.display = 'block';
            parentPriceDiv.style.display = 'block';
        } else {
            parentTotalDiv.style.display = 'none';
            parentPriceDiv.style.display = 'none';
        }
    }
    // Event listeners for the radio buttons
    allPlanRadio.addEventListener('change', togglePriceDisplay);
    plumbingOnlyRadio.addEventListener('change', togglePriceDisplay);
    const documentEmailed = document.getElementById('documentEmailed');
    const hardCopy = document.getElementById('hardCopy');
    const collectRadio = document.getElementById('collectRadio');
    const postRadio = document.getElementById('postRadio');
    var methodParentFieldDiv = hardCopy.closest('.planGroup');
    var methodLastSpan = methodParentFieldDiv.querySelector('.errorInfo');
    if (hardCopy.checked || documentEmailed.checked) {
        parentFieldDiv.style.backgroundColor = '#fff';
    } else {
        methodParentFieldDiv.style.backgroundColor = '#FFF1FF';
        methodLastSpan.style.display = 'contents';
    }
    collectRadio.disabled = true;
    postRadio.disabled = true;

    documentEmailed.addEventListener('change', function () {
        if (this.checked) {
            collectRadio.checked = false;
            collectRadio.disabled = true;
            postRadio.checked = false;
            postRadio.disabled = true;
            methodParentFieldDiv.style.backgroundColor = '#fff';
            methodLastSpan.style.display = 'none';
            methodLastSpan.textContent = "Choose Collect or Post"
        } else {
            collectRadio.disabled = true;
            postRadio.disabled = true;
        }
    });

    hardCopy.addEventListener('change', function () {
        if (this.checked) {
            collectRadio.disabled = false;
            postRadio.disabled = false;
            methodParentFieldDiv.style.backgroundColor = '#FFF1FF';
            methodLastSpan.style.display = 'contents';
        } else {
            postRadio.checked = false;
            collectRadio.checked = false;
        }
    });

    collectRadio.addEventListener('change', function () {
        if (this.checked) {
            methodParentFieldDiv.style.backgroundColor = '#fff';
            methodLastSpan.style.display = 'none';
        }
    });

    postRadio.addEventListener('change', function () {
        if (this.checked) {
            methodParentFieldDiv.style.backgroundColor = '#fff';
            methodLastSpan.style.display = 'none';
        }
    });

    //check if all required radios checked
    function checkRadios() {
        if (allPlanRadio.checked || plumbingOnlyRadio) {
            if (hardCopy.checked) {
                if (collectRadio.checked || postRadio.checked) {
                    console.log("aaaa")
                    return true;
                } else {
                    return false;
                }
            }
            if (documentEmailed.checked) {
                console.log("dddd")
                return true;
            }
        }
    }

    form.addEventListener('change', function (e) {
        if (e.target.type === 'radio') {
            var resBl = checkRadios(); // Call the function to check radios
            if (resBl) {
                secondStepNext.disabled = false;
            } else {
                secondStepNext.disabled = true;
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the div element
    const isOwnerDiv = document.getElementById('isOwner');
    // Hide the div initially
    isOwnerDiv.style.display = 'none';

    // Get the checkbox element
    const isOwnerRadio = document.getElementById('isOwnerRadio');
    const ownerRadio = document.getElementById('ownerRadio');
    const applicantRadio = document.getElementById('applicantRadio');
    // Add event listener to the checkbox
    isOwnerRadio.addEventListener('change', function () {
        // Check if the checkbox is checked
        if (this.checked) {
            // Show the div
            isOwnerDiv.style.display = 'block';
            ownerRadio.checked = false;
            ownerRadio.disabled = true;
            applicantRadio.checked = true;
            applicantRadio.disabled = true;
        } else {
            // Hide the div
            isOwnerDiv.style.display = 'none';
            ownerRadio.checked = true;
            ownerRadio.disabled = true;
            applicantRadio.checked = false;
            applicantRadio.disabled = true;
        }
    });

    applicantRadio.addEventListener('change', function () {
        if (this.checked) {
            isOwnerRadio.checked = true;
            isOwnerDiv.style.display = 'block';
            ownerRadio.checked = false;
            ownerRadio.disabled = true;
            applicantRadio.checked = true;
            applicantRadio.disabled = true;
        } else {
            isOwnerDiv.style.display = 'none';
            ownerRadio.checked = true;
            ownerRadio.disabled = true;
            applicantRadio.checked = false;
            applicantRadio.disabled = true;
        }
    });
});

//Signature
document.addEventListener("DOMContentLoaded", function () {
    var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(62,80,60)'
    });

    var signaturePadOwner = new SignaturePad(document.getElementById('signature-pad-1'), {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(62,80,60)'
    });

    var saveButton = document.getElementById('signatureSave');
    var cancelButton = document.getElementById('signatureClear');
    var saveButtonOwner = document.getElementById('OwnerSignatureSave');
    var cancelButtonOwner = document.getElementById('OwnerSignatureClear');

    var isSigned = false;
    var IsSignedOwner = false;
    var dateFill = false;

    cancelButtonOwner.addEventListener('click', function (event) {
        signaturePadOwner.clear();
        var signatureImage = document.getElementById('OwnerSignatureImage');
        signatureImage.style.display = 'none';
        signatureImage.src = "";
        IsSignedOwner = false;
    });

    saveButtonOwner.addEventListener('click', function (event) {
        var data = signaturePadOwner.toDataURL('image/png');
        var signatureImage = document.getElementById('OwnerSignatureImage');
        signatureImage.style.display = 'block';
        signatureImage.src = data;
        IsSignedOwner = true;
    });

    cancelButton.addEventListener('click', function (event) {
        signaturePad.clear();
        var signatureImage = document.getElementById('signatureImage');
        signatureImage.style.display = 'none';
        signatureImage.src = "";
        isSigned = false;
    });

    saveButton.addEventListener('click', function (event) {
        var data = signaturePad.toDataURL('image/png');
        var signatureImage = document.getElementById('signatureImage');
        signatureImage.style.display = 'block';
        signatureImage.src = data;
        isSigned = true;
    });

    var dateInput = document.getElementById('choose_date');

    dateInput.addEventListener('change', function () {
        if (validator.isDate(dateInput.value)) {
            dateFill = true;
        } else {
            dateFill = false;
        }
    })
    dateInput.addEventListener('change', toggleSubmitDisplay);
    cancelButton.addEventListener('click', toggleSubmitDisplay);
    saveButton.addEventListener('click', toggleSubmitDisplay);

    function toggleSubmitDisplay(){
        if (dateFill && isSigned){
            submitBtn.disabled = false;
            console.log(dateFill);
            console.log(isSigned);
        }else{
            submitBtn.disabled = true;
            console.log(dateFill);
            console.log(isSigned);
        }
    };

});



//multi step JS code
var currentStep = 1;
var updateProgressBar;

function displayStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= 3) {
        $(".step-" + currentStep).hide();
        $(".step-" + stepNumber).show();
        currentStep = stepNumber;
        updateProgressBar();
    }
}

$(document).ready(function () {
    $('#multi-step-form').find('.step').slice(1).hide();

    $(".next-step").click(function () {
        if (currentStep < 3) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutLeft");
            currentStep++;
            setTimeout(function () {
                $(".step").removeClass("animate__animated animate__fadeOutLeft").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInRight");
                updateProgressBar();
            }, 500);
        }
    });

    $(".prev-step").click(function () {
        if (currentStep > 1) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutRight");
            currentStep--;
            setTimeout(function () {
                $(".step").removeClass("animate__animated animate__fadeOutRight").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInLeft");
                updateProgressBar();
            }, 500);
        }
    });

    updateProgressBar = function () {
        var progressPercentage = ((currentStep - 1) / 2) * 100;
        $(".progress-bar").css("width", progressPercentage + "%");
    }
});

