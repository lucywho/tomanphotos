export type SessionUser = {
    name?: string
    email?: string
    image?: string
    isAdmin?: boolean
}

export type PhotoProps = {
    code: number
    title: string
    description: string
    image: string
}

export type FooterProps = {
    photos: PhotoProps[]
    setPhotos?: (photos: PhotoProps[]) => void
    showForm?: boolean
    setShowForm?: (showForm: boolean) => void
}
