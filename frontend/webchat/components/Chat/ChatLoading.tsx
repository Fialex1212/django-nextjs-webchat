import React from 'react'
import { Card, CardContent } from '../ui/card'

const ChatLoading = () => {
  return (
    <section>
    <div className="container">
      <Card className="py-1 px-1 flex-col gap-4 relative mb-4">
        <CardContent>
          <p className="text-center">Loading...</p>
        </CardContent>
      </Card>
    </div>
  </section>
  )
}

export default ChatLoading
