export interface Review {
    trip_id: number
    rate: number
    comment: string
    issue: string[] | null
    created_at: Date
}
