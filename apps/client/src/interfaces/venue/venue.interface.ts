export interface IVenue {
  id: number
  adminId: number
  uid: string
  name: string
  address: string
  coverImage: string
  workingDays: string[]
  openningHour: string
  closingHour: string
  isApproved: boolean
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}

// updatable type
export type IVenueEditable = Partial<
  Pick<
    IVenue,
    | 'name'
    | 'address'
    | 'coverImage'
    | 'openningHour'
    | 'closingHour'
    | 'workingDays'
  >
>

export type IVenueAdminEditable = IVenueEditable &
  Partial<Pick<IVenue, 'isApproved'>>

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
  coverImage?: string
}

export interface IVenueListResponse {
  data: IVenueWithDetails[]
  message?: string
}

export interface ISportType {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}
