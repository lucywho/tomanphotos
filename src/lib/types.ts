import { timestamp } from "aws-sdk/clients/cloudfront"

export type SessionUser = {
    name?: string
    email?: string
    image?: string
    isAdmin?: boolean
}

export type PhotoProps = {
    id: string
    code: number
    title: string
    description: string
    image: string
    url: string
    info?: string
    decade?: string
    year?: string
    date?: string
    createdAt: Date
}

export type FooterProps = {
    photos: PhotoProps[]
    setPhotos?: (photos: PhotoProps[]) => void
    showForm?: boolean
    setShowForm?: (showForm: boolean) => void
}
