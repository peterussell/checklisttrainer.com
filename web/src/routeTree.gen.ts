/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AircraftAircraftIdChecklistImport } from './routes/aircraft.$aircraftId.$checklist'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AircraftAircraftIdChecklistRoute =
  AircraftAircraftIdChecklistImport.update({
    id: '/aircraft/$aircraftId/$checklist',
    path: '/aircraft/$aircraftId/$checklist',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/aircraft/$aircraftId/$checklist': {
      id: '/aircraft/$aircraftId/$checklist'
      path: '/aircraft/$aircraftId/$checklist'
      fullPath: '/aircraft/$aircraftId/$checklist'
      preLoaderRoute: typeof AircraftAircraftIdChecklistImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRoute
  '/aircraft/$aircraftId/$checklist': typeof AircraftAircraftIdChecklistRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRoute
  '/aircraft/$aircraftId/$checklist': typeof AircraftAircraftIdChecklistRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRoute
  '/aircraft/$aircraftId/$checklist': typeof AircraftAircraftIdChecklistRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/dashboard' | '/aircraft/$aircraftId/$checklist'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/dashboard' | '/aircraft/$aircraftId/$checklist'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/dashboard'
    | '/aircraft/$aircraftId/$checklist'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  DashboardRoute: typeof DashboardRoute
  AircraftAircraftIdChecklistRoute: typeof AircraftAircraftIdChecklistRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  DashboardRoute: DashboardRoute,
  AircraftAircraftIdChecklistRoute: AircraftAircraftIdChecklistRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/dashboard",
        "/aircraft/$aircraftId/$checklist"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/aircraft/$aircraftId/$checklist": {
      "filePath": "aircraft.$aircraftId.$checklist.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
