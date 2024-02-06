import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMerchendiseStore = defineStore('shopItems', () => {
  const merchendise = [
    {
      id: 1,
      category: 'run/clothes/top',
      label: 'Forza - Black Singlet',
      price: 1300,
      link: 'black-singlet.png'
    },
    {
      id: 2,
      category: 'run/clothes/top',
      label: 'Forza - Pink-Green Singlet',
      price: 1500,
      link: 'pink-singlet.png'
    },
    {
      id: 3,
      category: 'run/clothes/top',
      label: 'Forza - Black-Red Singlet',
      price: 1500,
      link: 'red-singlet.png'
    },
    {
      id: 4,
      category: 'run/clothes/top',
      label: 'Forza - Black-Violet Singlet',
      price: 1500,
      link: 'violet-singlet.png'
    },
    {
      id: 5,
      category: 'run/clothes/top',
      label: 'Forza - White Singlet',
      price: 1300,
      link: 'white-singlet.png'
    },
    {
      id: 6,
      category: 'run/clothes/top',
      label: 'Forza - Black-Teal Singlet',
      price: 1500,
      link: 'teal-singlet.png'
    }
  ]

  const getMerch = () => {
    return merchendise
  }
  const getMerchById = (id: Number) => {
    return merchendise.find((merch) => merch.id === id)
  }
  return { getMerch, getMerchById }
})
