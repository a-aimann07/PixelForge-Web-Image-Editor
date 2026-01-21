let filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    exposure: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    greyscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
}

const imageContainer = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageContainer.getContext("2d")
const filtersContainer = document.querySelector(".filters")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")

let img 


function createFilterElement(name, unit, value, min, max) {

    const div = document.createElement("div")
    div.classList.add("filter")

    const p = document.createElement("p")
    p.innerText = name

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    input.addEventListener("input", () => {
        filters[name].value = input.value
        applyFilters() 
    })

    div.appendChild(p)
    div.appendChild(input)

    return div
}

function createFilters(){
Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max
    )
    filtersContainer.appendChild(filterElement)
    })
}

createFilters()


imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0]
    if (!file) return

    const placeholder = document.querySelector(".placeholder")
    imageContainer.style.display = "block"
    if (placeholder) placeholder.style.display = "none"

    img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        imageContainer.width = img.width
        imageContainer.height = img.height
        applyFilters()
    }
})


function applyFilters() {
    if (!img) return

    canvasCtx.clearRect(0, 0, imageContainer.width, imageContainer.height)

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.greyscale.value}${filters.greyscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
    `

    canvasCtx.drawImage(img, 0, 0)
}


resetButton.addEventListener("click", () => {
    filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    exposure: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    greyscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
    }
    applyFilters()

    filtersContainer.innerHTML = ""
    createFilters()
})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageContainer.toDataURL()
    link.click()
})

const presets = {
    vintage:{
  brightness: 105,
  contrast: 90,
  exposure: 95,
  saturation: 80,
  hueRotation: 10,
  blur: 1,
  greyscale: 10,
  sepia: 40,
  opacity: 100,
  invert: 0
},
 cool: {
  brightness: 95,
  contrast: 110,
  exposure: 105,
  saturation: 90,
  hueRotation: 190,
  blur: 0,
  greyscale: 0,
  sepia: 0,
  opacity: 100,
  invert: 0
},
 vivid: {
  brightness: 105,
  contrast: 130,
  exposure: 110,
  saturation: 140,
  hueRotation: 0,
  blur: 0,
  greyscale: 0,
  sepia: 0,
  opacity: 100,
  invert: 0
},
blackAndWhite : {
  brightness: 100,
  contrast: 120,
  exposure: 100,
  saturation: 0,
  hueRotation: 0,
  blur: 0,
  greyscale: 100,
  sepia: 0,
  opacity: 100,
  invert: 0
},
softFade: {
  brightness: 110,
  contrast: 80,
  exposure: 105,
  saturation: 85,
  hueRotation: 0,
  blur: 1,
  greyscale: 5,
  sepia: 5,
  opacity: 100,
  invert: 0
},
warmGlow : {
  brightness: 108,
  contrast: 105,
  exposure: 110,
  saturation: 115,
  hueRotation: 20,
  blur: 0,
  greyscale: 0,
  sepia: 20,
  opacity: 100,
  invert: 0
},
cinematic : {
  brightness: 95,
  contrast: 115,
  exposure: 100,
  saturation: 60,
  hueRotation: 180,
  blur: 0,
  greyscale: 10,
  sepia: 0,
  opacity: 100,
  invert: 0
},
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () => {
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName => {
        filters[filterName].value = preset[filterName]
        })

        applyFilters()
        filtersContainer.innerHTML = ""
        createFilters()

    })

})