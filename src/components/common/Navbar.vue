<template>
  <div>
    <nav class="bg-white shadow fixed z-50 w-full">
      <!-- FULL NAVBAR -->
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex justify-between w-full px-2 lg:px-0">
            <!-- LOGO -->
            <div class="flex flex-shrink-0 items-center">
              <RouterLink to="/"
                ><img class="h-6 w-auto" src="/logo/forza_logo.svg" alt="VLAD"
              /></RouterLink>
            </div>
            <!-- NAV LINKS -->
            <div class="hidden h-16 lg:ml-6 lg:flex lg:space-x-8 items-center">
              <!-- Current: "border-gray-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <RouterLink
                v-for="(link, index) in navLinks"
                :key="index"
                v-slot="{ isActive }"
                :to="link.value"
                ><div class="h-16 capitalize" :class="isActive ? 'active-class' : 'inactive-class'">
                  {{ link.label }}
                </div>
              </RouterLink>

              <div class="flex items-center gap-3 pl-5">
                <button class="px-3 py-2 rounded-lg bg-yellow-400">
                  <p class="text-sm font-medium">Connect Now!</p>
                </button>

                <Dropdown>
                  <template #button>
                    <IcUser size="30"></IcUser>
                  </template>
                  <template #dropdown-options>
                    <!-- Active: "bg-gray-100", Not Active: "" -->
                    <div class="w-40">
                      <a
                        v-for="option in userDropdownOptions"
                        :key="option.value"
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                        id="user-menu-item-0"
                        >{{ option.label }}</a
                      >
                    </div>
                  </template>
                </Dropdown>
                <IcShopCart class="cursor-pointer" :count="0" />
              </div>
            </div>
          </div>

          <div class="flex items-center lg:hidden">
            <!-- Mobile menu button -->
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="isDropdownMenuVisible = !isDropdownMenuVisible"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <!-- 
                  Icon when menu is closed.
                  Menu open: "hidden", Menu closed: "block"
                -->
              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <!-- 
                  Icon when menu is open.
                  Menu open: "block", Menu closed: "hidden"
                -->
              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- MOBILE -->
      <div class="lg:hidden" id="mobile-menu" v-if="isDropdownMenuVisible">
        <div class="space-y-1 pb-3 pt-2">
          <RouterLink
            v-for="(link, index) in navLinks"
            :key="index"
            v-slot="{ isActive }"
            :to="link.value"
            @click="isDropdownMenuVisible = false"
            ><div
              class="h-full capitalize"
              :class="isActive ? 'active-mobile-class' : 'inactive-mobile-class'"
            >
              {{ link.label }}
            </div>
          </RouterLink>
        </div>
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between px-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div>
                  <IcUser size="36" />
                </div>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">Username</div>
                <div class="text-sm font-medium text-gray-500">username@email.com</div>
              </div>
            </div>
            <IcShopCart class="cursor-pointer" />
          </div>
          <div class="mt-3 space-y-1">
            <a
              v-for="option in userDropdownOptions"
              :key="option.value"
              href="#"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >{{ option.label }}</a
            >
          </div>
        </div>
      </div>
    </nav>
    <div
      class="fixed inset-0 z-10 bg-white opacity-60"
      v-if="isDropdownMenuVisible"
      @click="isDropdownMenuVisible = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import IcUser from '../icons/IcUser.vue'
import IcShopCart from '../icons/IcShopCart.vue'
import Dropdown from './Dropdown.vue'
const { width } = useWindowSize()

watch(
  () => width.value,
  (newValue) => {
    if (newValue < 1024) {
      isDropdownMenuVisible.value = false
    }
  }
)

const isDropdownMenuVisible = ref<boolean>(false)

const navLinks = [
  {
    label: 'run',
    value: '/run'
  },
  {
    label: 'sale!',
    value: '/sale'
  },
  {
    label: 'calendar',
    value: '/calendar'
  },
  {
    label: 'about us',
    value: '/about-us'
  }
]

const userDropdownOptions = [
  {
    label: 'Sign In',
    value: 'sign-in'
  },
  {
    label: 'Connect Now',
    value: 'connect-now'
  },
  {
    label: 'My Profile',
    value: 'profile'
  },
  {
    label: 'Settings',
    value: 'settings'
  },
  {
    label: 'Log out',
    value: 'log-out'
  }
]
</script>

<style scoped>
.active-class {
  @apply inline-flex items-center border-b-2 border-gray-600 px-1 pt-1 text-sm font-medium text-gray-900;
}

.inactive-class {
  @apply inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700;
}

.active-mobile-class {
  @apply block border-l-4 border-gray-500 bg-gray-50 py-2 pl-3 pr-4 text-base font-medium text-gray-700;
}

.inactive-mobile-class {
  @apply block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800;
}
</style>
