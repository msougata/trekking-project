package com.project.demo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class ChecklistController {

    @PostMapping("/checklist")
    public List<String> getChecklist(@RequestBody ChecklistRequest request) {
        String location = request.getLocation().toLowerCase().trim();
        String month = request.getMonth().toLowerCase().trim();

        List<String> checklist = new ArrayList<>();

        // ✅ General Trekking Essentials
        checklist.add("🎒 Backpack - To carry all your belongings efficiently.");
        checklist.add("🥾 Trekking Shoes - Offers grip and support on rough terrains.");
        checklist.add("🚰 Reusable Water Bottle - Stay hydrated without polluting nature.");
        checklist.add("🧢 Cap or Hat - Protection from sun and heat.");
        checklist.add("🧴 Sunscreen - Prevents UV damage especially at high altitudes.");
        checklist.add("👓 Sunglasses - Protect your eyes from strong mountain glare.");
        checklist.add("🧻 Toilet Paper & Wet Wipes - Often unavailable in remote areas.");
        checklist.add("🍫 Energy Bars/Snacks - Quick energy boosts during treks.");
        checklist.add("🧦 Extra Pair of Socks - Keeps feet dry and prevents blisters.");
        checklist.add("👕 Layered Clothing - Adapt to changing weather during the trek.");
        checklist.add("🧷 First Aid Kit - For blisters, small injuries, or altitude sickness.");
        checklist.add("📱 Power Bank - No electricity in remote locations.");
        checklist.add("💡 Torch/Headlamp - Required in dark trails or campsites.");

        // 🌦️ Month-Based Conditions
        if (month.matches("june|july|august|september")) {
            checklist.add("🌧️ Raincoat or Poncho - Essential during monsoon season.");
            checklist.add("💼 Waterproof Backpack Cover - Protect gear from rain.");
            checklist.add("👟 Quick-Dry Clothes - Avoid staying wet in cold winds.");
        }

        if (month.matches("november|december|january|february")) {
            checklist.add("🧤 Thermal Gloves & Socks - To protect extremities from frostbite.");
            checklist.add("🧥 Heavy Jacket/Windcheater - For extremely cold and windy conditions.");
            checklist.add("🧣 Woolen Scarf - Extra insulation for the neck and face.");
        }

        // 📍 Location-Based Specific Recommendations
        switch (location) {
            case "kedarnath":
                checklist.add("🧣 Woolen Cap & Muffler - Even summer nights are cold.");
                checklist.add("🪪 Government ID Proof - Required at checkpoints and temple.");
                checklist.add("🍵 Thermos Flask - Hot drinks are helpful in freezing temperatures.");
                checklist.add("⛺ Tent & Sleeping Bag (if not staying in a lodge) - Night temps drop significantly.");
                break;
            case "triund":
                checklist.add("⛺ Tent & Sleeping Bag - Most trekkers camp overnight.");
                checklist.add("🔥 Portable Stove - Ideal for making tea/noodles while camping.");
                checklist.add("🦟 Insect Repellent - Bugs are common near the forest edge.");
                break;
            case "valley of flowers":
                checklist.add("📷 Camera - To capture rare Himalayan flora.");
                checklist.add("🧴 Biodegradable Toiletries - Required for eco-sensitive zones.");
                checklist.add("🚮 Cloth Bag - Plastic is banned in the national park.");
                checklist.add("👟 Sturdy Hiking Shoes - Trail can be slippery and uneven.");
                break;
            case "sandakphu":
                checklist.add("🗺️ Offline GPS or Map - Internet connectivity is poor.");
                checklist.add("🪪 Nepal Permit - Needed as part of the route crosses Nepal.");
                checklist.add("🧗 Trekking Poles - Very useful for steep and frequent ascents/descents.");
                checklist.add("🥶 Lip Balm & Moisturizer - Cold winds can chap your skin and lips.");
                break;
            case "hampta pass":
                checklist.add("🪢 Rope or Ice Axe (advanced treks) - For snow-covered patches.");
                checklist.add("🧊 Gaiters - Helps in snow and slush areas.");
                checklist.add("🪖 Helmet (optional) - If your trail includes bouldering or steep snow descents.");
                break;
            default:
                checklist.add("🔍 Tip: Check local forums or travel blogs for specific needs at " + request.getLocation() + ".");
                break;
        }

        return checklist;
    }
}
