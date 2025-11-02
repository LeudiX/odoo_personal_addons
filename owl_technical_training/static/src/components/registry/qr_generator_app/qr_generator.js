/** @odoo-module **/
import { Component, useState, onMounted } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
const QRCode = window.MyQRCode; // Adding custom QRCode library bundler

export class QRGenerator extends Component {

    static template = "owl_technical_training.qr_generator";

    setup() {

        onMounted(() => {
            if (!QRCode) {
                console.error('QRCode library not found');
                return;
            }
            console.info(`QRCode loaded!!!!`)
            QRCode.toDataURL('Testing with default message!', function (err, url) {
                console.log('QR test generated:', url)
            })
        })

        this.state = useState({
            input: "",
            qrDataUrl: null,
            error: null,
        });
    }

    async generateQr() {
        const input = this.state.input.trim();
        if (!input) {
            this.state.error = _t("Please, enter a URL or a credit card number 🤨");
            return;
        }

        // Validation for URL or CC (Basic)
        if (!this.isValidInput(input)) {
            this.state.error = _t("Invalid format. Please enter a valid URL or credit card number 😑");
            return;
        }

        try {
            // Generate QR as data URL
            const qrDataUrl = await this.createQrCode(input);
            this.state.qrDataUrl = qrDataUrl;
            this.state.error = null;
        } catch (error) {
            console.error(error);
            this.state.error = _t("Failed to generate QR code");
        }

    }

    isValidInput(value) {
        // Basic URL check
        try {
            new URL(value);
            return true;
        } catch { }

        // Basic credit card check (13-19 digits, no spaces)
        const ccRegex = /^\d{13,19}$/;
        if (ccRegex.test(value.replace(/\s+/g, ''))) {
            return true;
        }
        return false;
    }

    createQrCode(text) {
        const opts = {
            width: 200,
            margin: 1,
            color: {
                dark: "#000000",
                light: "#ffffff"
            }
        }
        return new Promise((resolve, reject) => {
            // Using global QR code library
            QRCode.toDataURL(text, opts, (err, url) => {
                err ? reject(err) : resolve(url)
            });
        });
    }

    reset() {
        Object.assign(this.state, { input: "", qrDataUrl: null, error: null });
    }
}