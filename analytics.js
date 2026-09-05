(function () {
    "use strict";

    var measurementId = "G-3BKSJ0JRCM";
    var consentKey = "jb-analytics-consent";
    var savedConsent = localStorage.getItem(consentKey);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
        analytics_storage: savedConsent === "granted" ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500
    });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
    });

    if (savedConsent) {
        return;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var banner = document.createElement("aside");
        banner.setAttribute("aria-label", "Analytics privacy choices");
        banner.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:auto;padding:16px 18px;background:#171717;color:#f5f5f5;border:1px solid #555;box-shadow:0 6px 24px rgba(0,0,0,.25);font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
        banner.innerHTML = '<div style="display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap"><p style="margin:0;max-width:520px">This site uses optional analytics cookies to understand visits and improve the website. <a href="/privacy.html" style="color:#fff;text-decoration:underline">Privacy details</a>.</p><div style="display:flex;gap:8px"><button type="button" data-consent="denied" style="padding:8px 13px;border:1px solid #aaa;background:transparent;color:#fff;cursor:pointer">Decline</button><button type="button" data-consent="granted" style="padding:8px 13px;border:1px solid #fff;background:#fff;color:#171717;cursor:pointer">Allow analytics</button></div></div>';
        document.body.appendChild(banner);

        banner.addEventListener("click", function (event) {
            var choice = event.target.getAttribute("data-consent");
            if (!choice) return;
            localStorage.setItem(consentKey, choice);
            window.gtag("consent", "update", { analytics_storage: choice });
            banner.remove();
        });
    });
}());
