class ColorObject {
    constructor(htmlElements) {
        this.htmlElements = htmlElements;
        console.log(this.htmlElements);

        this.htmlElementLabelHSL = [];
        this.htmlElementLabelRGB = [];
        this.htmlElementLabelHEX = [];
        this.htmlElementRect = [];
        this.RGB = [];
        this.HEX = [];
        this.HSL = [];
        this._Hue = [];
        this._Saturation = [];
        this._Lightness = [];
        this.getElementsFromParentInit();

        this.original_htmlElements=[...this.htmlElements];
        this.original_htmlElementLabelHSL=[...this.htmlElementLabelHSL];
        this.original_htmlElementLabelRGB=[...this.htmlElementLabelRGB];
        this.original_htmlElementLabelHEX=[...this.htmlElementLabelHEX];
        this.original_htmlElementRect=[...this.htmlElementRect];
        this.original_RGB=[...this.RGB];
        this.original_HEX=[...this.HEX];
        this.original_HSL=[...this.HSL];
        this.original__Hue=[...this._Hue];
        this.original__Saturation=[...this._Saturation];
        this.original__Lightness=[...this._Lightness];
    }

    resetOriginal(){
        this.htmlElements=[...this.original_htmlElements];
        this.htmlElementLabelHSL=[...this.original_htmlElementLabelHSL];
        this.htmlElementLabelRGB=[...this.original_htmlElementLabelRGB];
        this.htmlElementLabelHEX=[...this.original_htmlElementLabelHEX];
        this.htmlElementRect=[...this.original_htmlElementRect];
        this.RGB=[...this.original_RGB];
        this.HEX=[...this.original_HEX];
        this.HSL=[...this.original_HSL];
        this._Hue=[...this.original__Hue];
        this._Saturation=[...this.original__Saturation];
        this._Lightness=[...this.original__Lightness];
    }

    getElementsFromParentInit() {
        let i = 0;
        console.log(this.htmlElements)
        for (let key of this.htmlElements) {
            if (i % 2) {
                let keyChild = key.childNodes;
                this.htmlElementRect[(i / 2) - 0.5] = keyChild[1];
                this.htmlElementRect[(i / 2) - 0.5].style.backgroundColor = null;
                this.RGB[(i / 2) - 0.5] = window.getComputedStyle(this.htmlElementRect[(i / 2) - 0.5], null).getPropertyValue('background-color');
                this.HEX[(i / 2) - 0.5] = this._RGB2HEX(window.getComputedStyle(this.htmlElementRect[(i / 2) - 0.5], null).getPropertyValue('background-color'));
                this.HSL[(i / 2) - 0.5] = this._HEX2HSL(this._RGB2HEX(window.getComputedStyle(this.htmlElementRect[(i / 2) - 0.5], null).getPropertyValue('background-color')));
                this.htmlElementLabelRGB[(i / 2) - 0.5] = keyChild[3];
                this.htmlElementLabelHEX[(i / 2) - 0.5] = keyChild[5];
                this.htmlElementLabelHSL[(i / 2) - 0.5] = keyChild[7];

                this._Hue[(i / 2) - 0.5] = this.getHueFromHSLFromString(this.HSL[(i / 2) - 0.5]);
                this._Saturation[(i / 2) - 0.5] = this.getSaturationFromHSLFromString(this.HSL[(i / 2) - 0.5]);
                this._Lightness[(i / 2) - 0.5] = this.getLightnessFromHSLFromString(this.HSL[(i / 2) - 0.5]);
            }
            i++;
        }
        this.setLabels();
    }

    getElementsFromParent() {
        let i = 0;
        for (let key of this.htmlElements) {
            if (i % 2) {
                let keyChild = key.childNodes;
                this.htmlElementRect[(i / 2) - 0.5] = keyChild[1];

                if (this.htmlElementRect[(i / 2) - 0.5].style.backgroundColor) {
                    this.RGB[(i / 2) - 0.5] = this.htmlElementRect[(i / 2) - 0.5].style.backgroundColor;
                    this.HEX[(i / 2) - 0.5] = this._RGB2HEX(this.htmlElementRect[(i / 2) - 0.5].style.backgroundColor);
                    this.HSL[(i / 2) - 0.5] = this._HEX2HSL(this._RGB2HEX(this.htmlElementRect[(i / 2) - 0.5].style.backgroundColor));
                    this.htmlElementLabelRGB[(i / 2) - 0.5] = keyChild[3];
                    this.htmlElementLabelHEX[(i / 2) - 0.5] = keyChild[5];
                    this.htmlElementLabelHSL[(i / 2) - 0.5] = keyChild[7];

                    this._Hue[(i / 2) - 0.5] = this.getHueFromHSLFromString(this.HSL[(i / 2) - 0.5]);
                    this._Saturation[(i / 2) - 0.5] = this.getSaturationFromHSLFromString(this.HSL[(i / 2) - 0.5]);
                    this._Lightness[(i / 2) - 0.5] = this.getLightnessFromHSLFromString(this.HSL[(i / 2) - 0.5]);
                }
            }
            i++;
        }
        this.setLabels();
    }

    setLabels() {
        for (let key in this.htmlElementLabelRGB) {
            this.htmlElementLabelRGB[key].textContent = this.RGB[key];
            this.htmlElementLabelHEX[key].textContent = this.HEX[key];
            this.htmlElementLabelHSL[key].textContent = this.HSL[key];
        }
    }

    modifyColorsBackground() {
        for (let key in this.htmlElementRect) {
            this.htmlElementRect[key].style.backgroundColor = this.HSL[key];
        }
        this.getElementsFromParent();
    }

    setHSL(H, S, L) {
        for (let i = 0; i < 10; i++) {
            this.HSL[i] = `hsl(${H[i]},${S[i]}%,${L[i]}%)`;
        }

        this.modifyColorsBackground();
    }

    modifyColors(valueHue, valueSaturation, valueLightness) {
        // on modifie nos valeurs
        for (let key in this._Hue) {
            valueHue = parseInt(valueHue);
            this._Hue[key] = parseInt(this._Hue[key]);
            if (this._Hue[key] + valueHue > 360) {
                this._Hue[key] = Math.abs(this._Hue[key] + valueHue - 360);
            } else if (this._Hue[key] + valueHue < 0) {
                this._Hue[key] = Math.abs(this._Hue[key] + valueHue + 360);
            } else {
                this._Hue[key] = Math.abs(this._Hue[key] + valueHue);
            }
        }
        for (let key in this._Saturation) {
            valueSaturation = parseFloat(valueSaturation);
            this._Saturation[key] = Math.abs(this._Saturation[key] + valueSaturation);
            if (this._Saturation[key] > 100) {
                this._Saturation[key] = 100;
            } else if (this._Saturation[key] < 0) {
                this._Saturation[key] = 0;
            }
        }
        for (let key in this._Lightness) {
            valueLightness = parseFloat(valueLightness);
            this._Lightness[key] = Math.abs(this._Lightness[key] + valueLightness);
            if (this._Lightness[key] > 100) {
                this._Lightness[key] = 100;
            } else if (this._Lightness[key] < 0) {
                this._Lightness[key] = 0;
            }
        }
        // et on met à jours nos éléments
        this.setHSL(this._Hue, this._Saturation, this._Lightness);
    }

    getHueFromHSLFromString(hslString) {
        let re = /[0-9]{0,3}/g;
        for (let key of hslString.match(re)) {
            if (key) {
                return key
            }
        }
    }

    getSaturationFromHSLFromString(hslString) {
        let re = /[0-9]{0,3}(\.[0-9]+)?/g;
        let int = 0;
        for (let key of hslString.match(re)) {
            if (key) {
                if (int === 1) {
                    return parseFloat(key);
                }
                int++
            }
        }
    }

    getLightnessFromHSLFromString(hslString) {
        let re = /[0-9]{0,3}(\.[0-9]+)?/g;
        let int = 0;
        for (let key of hslString.match(re)) {
            if (key) {
                if (int === 2) {
                    return parseFloat(key);
                }
                int++
            }
        }
    }

    _RGB2HEX(rgb) {
        return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    }

    _HEX2HSL(H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    }

    _log() {
        console.log("this.htmlElements");
        console.log(this.htmlElements);
        console.log("this.htmlElementLabelHSL");
        console.log(this.htmlElementLabelHSL);
        console.log("this.htmlElementLabelRGB");
        console.log(this.htmlElementLabelRGB);
        console.log("this.htmlElementLabelHEX");
        console.log(this.htmlElementLabelHEX);
        console.log("this.htmlElementRect");
        console.log(this.htmlElementRect);
        console.log("this.RGB");
        console.log(this.RGB);
        console.log("this.HEX");
        console.log(this.HEX);
        console.log("this.HSL");
        console.log(this.HSL);
    }

    _logColors() {
        console.log("this.RGB");
        console.log(this.RGB);
        console.log("this.HEX");
        console.log(this.HEX);
        console.log("this.HSL");
        console.log(this.HSL);
        console.log("this._Hue");
        console.log(this._Hue);
        console.log("this._Saturation");
        console.log(this._Saturation);
        console.log("this._Lightness");
        console.log(this._Lightness);
    }
}