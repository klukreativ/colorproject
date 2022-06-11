import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };
    // creates an array for each color containing all the different levels
    for (let level of levels) {
        newPalette.colors[level] = [];
    }
    // loops through all the colours in the palette
    for (let color of starterPalette.colors) {
        // calls function to generate a scale from a color totalling x (10), reversed to re-order them from light - dark
        let scale = generateScale(color.color, 10).reverse();
        // for each item in the scale, it will add to the color levels array including its data
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                // replaces a space '/' globally '/g' with a dash '"-"' 
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                // uses chroma to convert the hex into a rgba value
                rgb: chroma(scale[i]).css(),
                // no easy way to get rgba using chroma, so replacing the ending with with an additional opacity value
                rgba: chroma(scale[i])
                    .css()
                    .replace('rgb', 'rgba')
                    .replace(')', ',1.0)')
            })
        }
    }
    return newPalette;
}

// returns a range of colours: original, darkened (by 1.4) and end color white 
function getRange(hexColor) {
    const end = "#fff";
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ]
}


function generateScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberOfColors);
}

export { generatePalette };