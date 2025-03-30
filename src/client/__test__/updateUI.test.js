const { updateUI } =require("../scripts/updateUI") // Update the path

describe("updateUI function", () => {
    document.body.innerHTML = `
        <div id="remainingDays"></div>
        <div class="cityName"></div>
        <div class="weather"></div>
        <div class="temp"></div>
        <div class="wnd_spd"></div>
        <div class="snow"></div>
        <div class="cityPic"></div>
        <div class="travel_app" style="display: none;"></div>
    `;

    test("should update the remaining days text", () => {
        updateUI(5, "Paris", "image_url", { description: "Sunny", temp: 25, wind_spd: 10, snow: 0 });

        expect(document.querySelector("#remainingDays").textContent).toBe("Trip starts in 5 days from now");
    });

    test("should update city name", () => {
        updateUI(5, "Paris", "image_url", { description: "Sunny", temp: 25, wind_spd: 10, snow: 0 });

        expect(document.querySelector(".cityName").textContent).toBe("Location: Paris");
    });


    test("should update image source", () => {
        updateUI(10, "New York", "https://example.com/image.jpg", { description: "Cloudy", temp: 22, wind_spd: 5, snow: 0 });

        expect(document.querySelector(".cityPic").innerHTML).toContain('<img src="https://example.com/image.jpg"');
    });

    test("should show wind speed and snow chance if Rdays > 7", () => {
        updateUI(8, "Berlin", "image_url", { description: "Snowy", temp: -2, wind_spd: 20, snow: 80 });

        expect(document.querySelector(".wnd_spd").textContent).toBe("Wind Speed: 20");
        expect(document.querySelector(".snow").textContent).toBe("Snow Chance: 80 %");
    });

    test("should hide wind speed and snow chance if Rdays <= 7", () => {
        updateUI(6, "Madrid", "image_url", { description: "Sunny", temp: 30, wind_spd: 10, snow: 0 });

        expect(document.querySelector(".wnd_spd").textContent).toBe("");
        expect(document.querySelector(".snow").textContent).toBe("");
    });

    test("should make travel app section visible", () => {
        updateUI(4, "Rome", "image_url", { description: "Windy", temp: 20, wind_spd: 5, snow: 10 });

        expect(document.querySelector(".travel_app").style.display).toBe("block");
    });
});
