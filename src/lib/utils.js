import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { cubicOut } from "svelte/easing"
import { createTransition } from "@threlte/extras"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node)
  const transform = style.transform === "none" ? "" : style.transform

  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA
    const [minB, maxB] = scaleB

    const percentage = (valueA - minA) / (maxA - minA)
    const valueB = percentage * (maxB - minB) + minB

    return valueB
  }

  const styleToString = (style) => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str
      return str + `${key}:${style[key]};`
    }, "")
  }

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      })
    },
    easing: cubicOut,
  }
}

export const fade = (duration = 400, delay = 0) => {
  return createTransition((ref) => {
    if (!ref.transparent) ref.transparent = true
    return {
      tick(t) {
        ref.opacity = t
      },
      easing: cubicOut,
      duration,
    }
  })
}

export const scale = (duration = 400, delay = 0) => {
  return createTransition((ref) => {
    return {
      tick(t) {
        // t is [0,1] and needs to be converted to [0.5,1]
        t = 0.5 + t * 0.5
        ref.scale.set(t, t, t)
      },
      easing: cubicOut,
      duration,
    }
  })
}

export const fly = (duration = 400, delay = 0) => {
  return createTransition((ref) => {
    return {
      tick(t) {
        // t is [0,1] and needs to be converted to [1,0]
        t = 1 - t
        ref.position.y = t
      },
      easing: cubicOut,
      duration,
      delay,
    }
  })
}

export function formatCoefficient(coefficient, variable) {
  if (coefficient >= 0) {
    return ` + ${coefficient}${variable}`
  } else {
    return ` - ${Math.abs(coefficient)}${variable}`
  }
}
