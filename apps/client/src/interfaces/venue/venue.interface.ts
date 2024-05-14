export interface IVenue {
  id: number
  adminId: number
  uid: string
  name: string
  address: string
  isApproved: boolean
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}

export interface IVenueWithDetails extends IVenue {
  owner: {
    id: number
    email: string
    username: string
    isApproved: boolean
    profile: {
      id: number
      userId: number
      fname: string
      lname: string
      address: string
      createdAt: string
      updatedAt: string | null
    }
  }
}

export interface IVenueBody {
  name: string
  address: string
}

export interface IVenueListResponse {
  data: IVenueWithDetails[]
  message?: string
}
