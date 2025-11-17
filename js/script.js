let countButton = $('#count-button');
let resetButton = $('#reset-button');
let paper = $('#paper');
let density = $('#density');
let densityCount = 80;
let designer_paper = $('#designer-paper');
let format = $('#format-select');
let width = $('#width');
let height = $('#height');
let circulation = 0;
let printType = $('#printType');
let complects = $('#complects');
let pricePerSheet = 0;
let totalPrice = 0;

countButton.click(function () {
    calculate();
});

resetButton.click(function () {
    pricePerSheet = 0;
    totalPrice = 0;
    densityCount = 80;
    circulation = 0;
    format.val("A4").change();
    width.val('');
    height.val('');
    paper.val("Офсетний").change();
    designer_paper.css("display", "none");
    $('#density').html(`
                <option selected value=80>80</option>
                <option value=160>160</option>
                <option value=300>300</option>
    `);
    $("#circulation").val('');
    printType.val("default").change();
    complects.val('');
    $('.complect-price').css('display', 'none');
    $('.total-price .value').text(0);
    $('.unit-price .value').text(0);
})

$('#circulation').change(function () {
    circulation = parseFloat($('#circulation').val());
})

width.change(function () {
    format.val('own').change();
})

height.change(function () {
    format.val('own').change();
})

density.click(function () {
    densityCount = parseFloat($('#density').val());
})

paper.click(function () {
    switch (paper.val()) {
        case "Офсетний":
            designer_paper.css("display", "none");
            $('#density').html(`
                <option selected value=80>80</option>
                <option value=160>160</option>
                <option value=300>300</option>
            `);
            break;
        case "Крейдований":
            designer_paper.css("display", "none");
            density.html(`
                <option value=130>130</option>
                <option value=200>200</option>
                <option value=300>300</option>
            `);
            break;
        case "Дизайнерський":
            designer_paper.css("display", "block");
            density.html(`
                 <option selected disabled>285</option>
            `);
            designer_paper.change(function () {
                switch (designer_paper.val()) {
                    case "Dali candido":
                        density.html(`
                        <option selected value=285 disabled>285</option>
                    `);
                        break;
                    case "Dali neve":
                        density.html(`
                        <option selected disabled>285</option>
                    `);
                        break;
                    case "GSK Калька EW":
                        density.html(`
                        <option selected disabled>200</option>
                    `);
                        break;
                    case "Stardream crystal":
                        density.html(`
                        <option selected disabled>285</option>
                    `);
                        break;
                    case "Stardream diamond":
                        density.html(`
                        <option selected disabled>285</option>
                    `);
                        break;
                    case "Stardream opal":
                        density.html(`
                        <option selected disabled>285</option>
                    `);
                        break;
                    case "Stardream citrine":
                        density.html(`
                        <option selected disabled>285</option>
                    `);
                        break;
                    case "Flora avorio":
                        density.html(`
                        <option selected disabled>350</option>
                    `);
                        break;
                    case "Tintoretto gesso":
                        density.html(`
                        <option selected disabled>300</option>
                    `);
                        break;
                    case "Sirio pearl aurum":
                        density.html(`
                        <option selected disabled>300</option>
                    `);
                        break;
                    case "Icelite 2s Toile moyenne":
                        density.html(`
                        <option selected disabled>335</option>
                    `);
                        break;
                    case "SplendorGel avorio":
                        density.html(`
                        <option selected disabled>300</option>
                    `);
                        break;
                    case "Sirio white white":
                        density.html(`
                        <option selected disabled>350</option>
                    `);
                        break;
                }
            })
            break;
    }
});

function calculate() {
    densityCount = parseFloat($('#density').val());
    circulation = parseFloat($('#circulation').val());
    let elemArea = 0;
    let count = 0;
    let cutPrice = 0;
    if (format.val() === "own") {
        elemArea = parseFloat(width.val()) * parseFloat(height.val());
        count = Math.floor((297*420)/elemArea);
        if (circulation >= 1 && circulation <= 3) {
            if (count <= 8) cutPrice = 12;
            else if (count > 8) cutPrice = 26;
        }
        if (circulation >= 4 && circulation <= 10) {
            if (count <= 8) cutPrice = 10;
            else if (count > 8) cutPrice = 24;
        }
        if (circulation >= 11 && circulation <= 25) {
            if (count <= 8) cutPrice = 8;
            else if (count > 8) cutPrice = 20;
        }
        if (circulation >= 26 && circulation <= 50) {
            if (count <= 8) cutPrice = 6;
            else if (count > 8) cutPrice = 15;
        }
        if (circulation >= 51 && circulation <= 100) {
            if (count <= 8) cutPrice = 4;
            else if (count > 8) cutPrice = 10;
        }
        if (circulation > 100) {
            if (count <= 8) cutPrice = 3;
            else if (count > 8) cutPrice = 8;
        }
    }

    switch (paper.val()) {
            case "Офсетний":
                if (format.val() === "A4" || format.val() === "A5" || format.val() === "A6" || format.val() === "Вiзитка 50х90мм" || format.val() === "Євро вiзитка 55х85мм" || format.val() === "100x200мм" || format.val() === "100x100мм" || (parseFloat(width.val()) <= 210 && parseFloat(height.val()) <= 297) && (parseFloat(width.val()) >= 40 && parseFloat(height.val()) >= 40)) {
                    if (densityCount === 80) {
                        if (printType.val() === "Односторонній друк") {
                            if (circulation >= 1 && circulation <= 9) {
                                pricePerSheet = 17;
                            } else if (circulation >= 10 && circulation <= 29) {
                                pricePerSheet = 14.62;
                            } else if (circulation >= 30 && circulation <= 49) {
                                pricePerSheet = 12.75;
                            } else if (circulation >= 50 && circulation <= 99) {
                                pricePerSheet = 10.88;
                            } else if (circulation >= 100 && circulation <= 299) {
                                pricePerSheet = 9.35;
                            } else if (circulation >= 300 && circulation <= 999) {
                                pricePerSheet = 8.16;
                            } else if (circulation >= 1000 && circulation <= 2999) {
                                pricePerSheet = 7.31;
                            } else if (circulation >= 3000) {
                                pricePerSheet = 5.78;
                            }
                        } else {
                            if (circulation >= 1 && circulation <= 9) {
                                pricePerSheet = 25;
                            } else if (circulation >= 10 && circulation <= 29) {
                                pricePerSheet = 21.5;
                            } else if (circulation >= 30 && circulation <= 49) {
                                pricePerSheet = 18.75;
                            } else if (circulation >= 50 && circulation <= 99) {
                                pricePerSheet = 16;
                            } else if (circulation >= 100 && circulation <= 299) {
                                pricePerSheet = 13.75;
                            } else if (circulation >= 300 && circulation <= 999) {
                                pricePerSheet = 12;
                            } else if (circulation >= 1000 && circulation <= 2999) {
                                pricePerSheet = 10.75;
                            } else if (circulation >= 3000) {
                                pricePerSheet = 8.5;
                            }
                        }
                    }
                    A3Prices();
                } else if (format === "A3" || (parseFloat(width.val()) <= 297 && parseFloat(height.val()) <= 420) && (parseFloat(width.val()) > 210 && parseFloat(height.val()) > 297)) {
                    if (densityCount === 80) {
                        if (printType.val() === "Односторонній друк") {
                            if (circulation >= 1 && circulation <= 4) {
                                pricePerSheet = 28;
                            } else if (circulation >= 5 && circulation <= 14) {
                                pricePerSheet = 23.18;
                            } else if (circulation >= 15 && circulation <= 24) {
                                pricePerSheet = 21;
                            } else if (circulation >= 25 && circulation <= 49) {
                                pricePerSheet = 18.2;
                            } else if (circulation >= 50 && circulation <= 149) {
                                pricePerSheet = 15.96;
                            } else if (circulation >= 150 && circulation <= 499) {
                                pricePerSheet = 14;
                            } else if (circulation >= 500 && circulation <= 1499) {
                                pricePerSheet = 12.6;
                            } else if (circulation >= 1500) {
                                pricePerSheet = 10.92;
                            }
                        } else {
                            if (circulation >= 1 && circulation <= 4) {
                                pricePerSheet = 38;
                            } else if (circulation >= 5 && circulation <= 14) {
                                pricePerSheet = 32.3;
                            } else if (circulation >= 15 && circulation <= 24) {
                                pricePerSheet = 28.5;
                            } else if (circulation >= 25 && circulation <= 49) {
                                pricePerSheet = 24.7;
                            } else if (circulation >= 50 && circulation <= 149) {
                                pricePerSheet = 21.66;
                            } else if (circulation >= 150 && circulation <= 499) {
                                pricePerSheet = 19;
                            } else if (circulation >= 500 && circulation <= 1499) {
                                pricePerSheet = 17.1;
                            } else if (circulation >= 1500) {
                                pricePerSheet = 14.82;
                            }
                        }
                    }
                    A3Prices();
                }
                break;
            case "Крейдований":
                if (densityCount === 130) {
                    if (printType.val() === "Односторонній друк") {
                        if (circulation >= 1 && circulation <= 4) pricePerSheet = 36;
                        else if (circulation >= 5 && circulation <= 14) pricePerSheet = 30.23;
                        else if (circulation >= 15 && circulation <= 24) pricePerSheet = 26.63;
                        else if (circulation >= 25 && circulation <= 49) pricePerSheet = 23.03;
                        else if (circulation >= 50 && circulation <= 149) pricePerSheet = 20.15;
                        else if (circulation >= 150 && circulation <= 499) pricePerSheet = 17.28;
                        else if (circulation >= 500 && circulation <= 1499) pricePerSheet = 14.4;
                        else if (circulation >= 1500) pricePerSheet = 11.51;
                    } else anotherPrint(36, 30.23, 26.63, 23.03, 20.15, 17.28, 14.4, 11.51);
                    }
                else if (densityCount === 200) {
                    if (printType.val() === "Односторонній друк") {
                        if (circulation >= 1 && circulation <= 4) pricePerSheet = 44;
                        else if (circulation >= 5 && circulation <= 14)  pricePerSheet = 36.96;
                        else if (circulation >= 15 && circulation <= 24) pricePerSheet = 32.56;
                        else if (circulation >= 25 && circulation <= 49)  pricePerSheet = 28.16;
                        else if (circulation >= 50 && circulation <= 149) pricePerSheet = 24.64;
                        else if (circulation >= 150 && circulation <= 499) pricePerSheet = 21.11;
                        else if (circulation >= 500 && circulation <= 1499) pricePerSheet = 17.6;
                        else if (circulation >= 1500) pricePerSheet = 14.08;
                    } else anotherPrint(44, 36.96, 32.56, 28.16, 24.64, 21.11, 17.6, 14.08);
                } else if (densityCount === 300) {
                    if (printType.val() === "Односторонній друк") {
                        if (circulation >= 1 && circulation <= 4) pricePerSheet = 54;
                        else if (circulation >= 5 && circulation <= 14) pricePerSheet = 45.36;
                        else if (circulation >= 15 && circulation <= 24) pricePerSheet = 39.96;
                        else if (circulation >= 25 && circulation <= 49) pricePerSheet = 34.56;
                        else if (circulation >= 50 && circulation <= 149) pricePerSheet = 30.24;
                        else if (circulation >= 150 && circulation <= 499) pricePerSheet = 25.91;
                        else if (circulation >= 500 && circulation <= 1499) pricePerSheet = 21.6;
                        else if (circulation >= 1500) pricePerSheet = 17.28;
                    } else anotherPrint(54, 45.36, 39.96, 34.56, 30.24, 25.91, 21.6, 17.28);
                }
                break;
            case "Дизайнерський":
                switch (designer_paper.val()) {
                    case "Dali candido":
                        designerPaper(110, 100, 95, 90, 85)
                        break;
                    case "Dali neve":
                        designerPaper(110, 100, 95, 90, 85)
                        break;
                    case "Stardream crystal":
                        designerPaper(120, 109.1, 103.64, 98.18, 92.73)
                        break;
                    case "Stardream diamond":
                        designerPaper(120, 109.1, 103.64, 98.18, 92.73)
                        break;
                    case "Stardream opal":
                        designerPaper(120, 109.1, 103.64, 98.18, 92.73)
                        break;
                    case "Stardream citrine":
                        designerPaper(140, 127.3, 120.8, 114.55, 108.18)
                        break;
                    case "Flora avorio":
                        designerPaper(100, 90.9, 86.36, 81.82, 77.27)
                        break;
                    case "Tintoretto gesso":
                        designerPaper(100, 90.9, 86.36, 81.82, 77.27)
                        break;
                    case "Sirio pearl aurum":
                        designerPaper(160, 145.45, 138.18, 130.91, 123.64)
                        break;
                    case "Toile moyenne":
                        designerPaper(100, 90.9, 86.36, 81.82, 77.27)
                        break;
                    case "SplendorGel avorio":
                        designerPaper(100, 90.9, 86.36, 81.82, 77.27)
                        break;
                    case "Sirio white white":
                        designerPaper(110, 100, 95, 90, 85)
                        break;
                    case "GSK Калька EW":
                        designerPaper(120, 109.1, 103.64, 98.18, 92.73)
                        break;
                }
                break;
        }
    pricePerSheet += cutPrice;
    totalPrice = pricePerSheet * circulation * parseFloat(complects.val());
    $('.total-price .value').text(totalPrice);
    $('.unit-price .value').text(pricePerSheet);
    if (parseFloat(complects.val()) > 1) {
        $('.complect-price').css('display', 'block');
        $('.complect-price .value').text(totalPrice / parseFloat(complects.val()));
    }  else $('.complect-price').css('display', 'none');
}

function A3Prices() {
    if (densityCount === 160) {
        if (printType.val() === "Односторонній друк") {
            if (circulation >= 1 && circulation <= 4) pricePerSheet = 48;
            else if (circulation >= 5 && circulation <= 14) pricePerSheet = 40.32;
            else if (circulation >= 15 && circulation <= 24) pricePerSheet = 35.52;
            else if (circulation >= 25 && circulation <= 49) pricePerSheet = 30.72;
            else if (circulation >= 50 && circulation <= 149) pricePerSheet = 26.88;
            else if (circulation >= 150 && circulation <= 499) pricePerSheet = 23.04;
            else if (circulation >= 500 && circulation <= 1499) pricePerSheet = 19.2;
            else if (circulation >= 1500) pricePerSheet = 15.36;
        } else anotherPrint(48, 40.32, 35.52, 30.72, 26.88, 23.04, 19.2, 15.36);
    } else if (densityCount === 300) {
        if (printType.val() === "Односторонній друк") {
            if (circulation >= 1 && circulation <= 4) pricePerSheet = 70;
            else if (circulation >= 5 && circulation <= 14) pricePerSheet = 58.8;
            else if (circulation >= 15 && circulation <= 24) pricePerSheet = 51.8;
            else if (circulation >= 25 && circulation <= 49) pricePerSheet = 44.79;
            else if (circulation >= 50 && circulation <= 149) pricePerSheet = 39.2;
            else if (circulation >= 150 && circulation <= 499) pricePerSheet = 33.6;
            else if (circulation >= 500 && circulation <= 1499) pricePerSheet = 28;
            else if (circulation >= 1500)  pricePerSheet = 22.4;
        } else anotherPrint(70, 58.8, 51.8, 44.79, 39.2, 33.6, 28, 22.4);
    }
}

function anotherPrint(first, second, third, fourth, fifth, sixth, seventh, eighth) {
    if (circulation >= 1 && circulation <= 4) pricePerSheet = first + 18;
    else if (circulation >= 5 && circulation <= 14) pricePerSheet = second + 15.12;
    else if (circulation >= 15 && circulation <= 24) pricePerSheet = third + 13.32;
    else if (circulation >= 25 && circulation <= 49) pricePerSheet = fourth + 11.52;
    else if (circulation >= 50 && circulation <= 149) pricePerSheet = fifth + 10.08;
    else if (circulation >= 150 && circulation <= 499) pricePerSheet = sixth + 8.64;
    else if (circulation >= 500 && circulation <= 1499) pricePerSheet = seventh + 7.2;
    else if (circulation >= 1500) pricePerSheet = eighth + 5.76;
}

function designerPaper(first, second, third, fourth, fifth) {
    if (printType.val() === "Односторонній друк") {
        if (circulation === 1) pricePerSheet = first;
        if (circulation >= 2 && circulation <= 4) pricePerSheet = second;
        if (circulation >= 5 && circulation <= 14) pricePerSheet = third;
        if (circulation >= 15 && circulation <= 24) pricePerSheet = fourth;
        if (circulation >= 25) pricePerSheet = fifth;
    } else {
        if (circulation === 1) pricePerSheet = first + 35;
        if (circulation >= 2 && circulation <= 4) pricePerSheet = second + 31.8;
        if (circulation >= 5 && circulation <= 14) pricePerSheet = third + 30.22;
        if (circulation >= 15 && circulation <= 24) pricePerSheet = fourth + 28.63;
        if (circulation >= 25) pricePerSheet = fifth + 27.04;
    }
}