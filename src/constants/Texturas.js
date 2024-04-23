import {TextureLoader} from 'three'

import mapa from '../assets/tierra.png'
import sceneImg from '../assets/galaxia.png'
import nube from '../assets/nube.png'
import sol from "../assets/sol.png"
import mercurio from "../assets/mercurio.png"
import venus from "../assets/venus.png"
import marte from "../assets/marte.png"
import jupiter from "../assets/jupiter.png"
import saturno from "../assets/saturno.png"
import urano from "../assets/urano.png"
import neptuno from "../assets/neptuno.png"
import star from "../assets/star.png"
import mercuryalpha from "../assets/mercurioalpha.png"

const textureLoader = new TextureLoader()
export const colorTextureScene = textureLoader.load(sceneImg)
export const colorTexture = textureLoader.load(mapa)
export const cloudTexture = textureLoader.load(nube)
export const colorTextureSol = textureLoader.load(sol)
export const colorTextureMercury = textureLoader.load(mercurio)
export const colorTextureVenus = textureLoader.load(venus)
export const colorTextureMarte = textureLoader.load(marte)
export const colorTextureJupiter = textureLoader.load(jupiter)
export const colorTextureSaturno = textureLoader.load(saturno)
export const colorTextureUrano = textureLoader.load(urano)
export const colorTextureNeptuno = textureLoader.load(neptuno)
export const colorTextureStar = textureLoader.load(star)
export const colorTextureMercuryAlpha = textureLoader.load(mercuryalpha)