addLayer("f", {
    name: "fight", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#B71C1C",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "kills", // Name of prestige currency
    baseResource: "power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {  
            title: "Boxing Gloves",
            description: "Double your power gain.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('f',11)}
        },
        12: {  
            title: "Blood Powered",
            description: "Power gain is based on kills.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {  
            title: "Fist of Rage",
            description: "Kill gain is based on power.",
            cost: new Decimal(2),
            effect() {
                return player.points.add(1).pow(0.15)
            },
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for kills", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})

