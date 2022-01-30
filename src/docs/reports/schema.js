const reportSchema = {
  type: 'object',
  properties: {
    outages: {
      type: 'number',
      description: 'The total number of URL downtimes'
    },
    availability: {
      type: 'number',
      description: 'A percentage of the URL availability'
    },
    responseTime: {
      type: 'number',
      description: 'The average response time for the URL'
    },
    history: {
      type: 'number',
      description: 'Timestamped logs of the polling requests'
    },
    downtime: {
      type: 'number',
      description: 'The total time, in seconds, of the URL downtime'
    },
    uptime: {
      type: 'number',
      description: 'The total time, in seconds, of the URL uptime'
    },
    status: {
      type: 'string',
      description: 'The current status of the URL',
      enum: ['Up', 'Down']
    }
  }
}

export const getAvailabilityReportResponseSchema = reportSchema
