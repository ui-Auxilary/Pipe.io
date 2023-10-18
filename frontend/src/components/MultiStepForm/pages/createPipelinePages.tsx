export const createPipelinePages = [
  {
    "section": 1,
    "items": [
      {
        "label": "Name",
        "type": "text",
        "value": "name"
      },
      {
        "label": "Description",
        "type": "text",
        "value": "description"
      },
      {
        "label": "Data source",
        "type": "dropzone",
        "value": "csv"
      }
    ]
  },
  {
    "section": 2,
    "items": [
      {
        "type": "list_microservices"
      }
    ]
  },
  {
    "section": 3,
    "items": [
      {
        "label": "Upload microservice file(s)",
        "type": "dropzone",
        "value": "python"
      }
    ]
  },
  {
    "section": 4,
    "items": [
      {
        "type": "view_microservices"
      }
    ]
  }
]