define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login Request",
    "name": "Login",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"user\": {\n   \"id\": \"cc1804a4-a517-4c36-b100-339b10195923\",\n   \"email\": \"John\",\n   \"first_name\": \"Doe\",\n   \"last_name\": \"example1@example1.com\",\n },\n \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t\"email\": \"example1@example1.com\",\n\t\"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/authRoutes.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "Register Request",
    "name": "Register",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n \"user\": {\n   \"id\": \"cc1804a4-a517-4c36-b100-339b10195923\",\n   \"email\": \"John\",\n   \"first_name\": \"Doe\",\n   \"last_name\": \"example1@example1.com\",\n }, \n \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t\"fistName\": \"John\",\n \"lastName\": \"Doe\",\n \"email\": \"example1@example1.com\",\n\t\"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/authRoutes.js",
    "groupTitle": "Auth"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_arman_Documents_party_planner_be_docs_main_js",
    "groupTitle": "C__Users_arman_Documents_party_planner_be_docs_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/api/events/:userId",
    "title": "Create An Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of person creating the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t\"name\": \"Event Name\",\n\t\"date\": \"2020-02-28\",\n\t\"startTime\": \"6 : 00 PM\",\n\t\"budget\":5000,\n\t\"location\": \"Event Location\",\n\t\"address\": \"1010 Walnut Ave\",\n\t\"private\": 1,\n\t\"adultGuests\": 30,\n\t\"childGuests\": 40,\n \"background_color\": null,\n \"theme\": null,\n}",
          "type": "json"
        }
      ]
    },
    "name": "Create",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with event data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 201 Created\n{\n \"event\": {\n   \"id\": \"f5a961e0-f4be-4af6-a91d-816eff1bd9a9\",\n   \"name\": \"Event Name\",\n   \"date\": \"2020-02-28\",\n   \"start_time\": \"6 : 00 PM\",\n   \"end_time\": null,\n   \"budget\": 5000,\n   \"location\": \"Event Location\",\n   \"address\": \"1010 Walnut Ave\",\n   \"private\": true,\n   \"adult_guests\": 30,\n   \"child_guests\": 20,\n   \"background_color\": null,\n   \"theme\": null,\n   \"host_id\": \"f97ccc1e-c543-42ac-84d8-cbdab63f9a1d\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/eventRoutes.js",
    "groupTitle": "Events"
  },
  {
    "type": "delete",
    "url": "/api/event/:eventId",
    "title": "Delete An Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Event id of event to be deleted</p>"
          }
        ]
      }
    },
    "name": "Delete",
    "group": "Events",
    "success": {
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/eventRoutes.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/api/events/:userId",
    "title": "Get Events By User Id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id grabs all events created by this user</p>"
          }
        ]
      }
    },
    "name": "Get",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "events",
            "description": "<p>List with event objects that the user has created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 201 Created\n{\n events: [\n     {\n        \"id\": \"f5a961e0-f4be-4af6-a91d-816eff1bd9a9\",\n        \"name\": \"Event Name\",\n        \"date\": \"2020-02-28\",\n        \"start_time\": \"6 : 00 PM\",\n        \"end_time\": null,\n        \"budget\": 5000,\n        \"location\": \"Event Location\",\n        \"address\": \"1010 Walnut Ave\",\n        \"private\": true,\n        \"adult_guests\": 30,\n        \"child_guests\": 20,\n        \"background_color\": null,\n        \"theme\": null,\n        \"host_id\": \"f97ccc1e-c543-42ac-84d8-cbdab63f9a1d\"\n     },\n     {\n        \"id\": \"g4d961e0-f4be-4ad6-a91d-816eff1n3uaa\",\n        \"name\": \"Event 2\",\n        \"date\": \"2020-04-21\",\n        \"start_time\": \"6 : 00 PM\",\n        \"end_time\": null,\n        \"budget\": 200,\n        \"location\": \"Unknown\",\n        \"address\": \"203 Rose Rd\",\n        \"private\": true,\n        \"adult_guests\": 10,\n        \"child_guests\": 0,\n        \"background_color\": null,\n        \"theme\": null,\n        \"host_id\": \"f97ccc1e-c543-42ac-84d8-cbdab63f9a1d\"\n    }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/eventRoutes.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "/api/events/:eventId",
    "title": "Update An Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Id of Event to update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n    \"name\": \"Event Name\",\n    \"date\": \"2020-02-28\",\n    \"startTime\": \"4 : 00 PM\"`,\n    \"endTime\":  \"12 : 00 AM\",\n    \"budget\": 3000,\n    \"location\": \"Event Location\",\n    \"address\": \"2020 Walnut Ave\",\n    \"private\": true,\n    \"adultGuests\": 30,\n    \"childGuests\": 20,\n    \"backgroundColor\": null,  \n    \"theme\": null,\n    \"hostId\": \"f97ccc1e-c543-42ac-84d8-cbdab63f9a1d\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "Update",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with event data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 Ok\n{\n \"event\": {\n   \"id\": \"f5a961e0-f4be-4af6-a91d-816eff1bd9a9\",\n   \"name\": \"Event Name\",\n   \"date\": \"2020-02-28\",\n   \"start_time\": \"6 : 00 PM\",\n   \"end_time\": null,\n   \"budget\": 5000,\n   \"location\": \"Event Location\",\n   \"address\": \"1010 Walnut Ave\",\n   \"private\": true,\n   \"adult_guests\": 30,\n   \"child_guests\": 20,\n   \"background_color\": null,\n   \"theme\": null,\n   \"host_id\": \"f97ccc1e-c543-42ac-84d8-cbdab63f9a1d\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/eventRoutes.js",
    "groupTitle": "Events"
  },
  {
    "type": "post",
    "url": "/api/shopping/:eventId",
    "title": "Create A Shopping Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Id of event to create shopping item for</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t \"name\": \"example\",\n\t \"notes\": \"none\",\n\t \"purchased\": false,\n\t \"cost\": 100\n}",
          "type": "json"
        }
      ]
    },
    "name": "Create",
    "group": "Shopping",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with item data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"id\": \"284f1eae-1189-4f0c-936e-9221492076bd\",\n  \"name\": \"Decorations\",\n  \"event_id\": \"395e889d-8b38-45c9-b786-48427c64786a\",\n  \"cost\": 100,\n  \"purchased\": false,\n  \"notes\": \"none\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/shoppingRoutes.js",
    "groupTitle": "Shopping"
  },
  {
    "type": "get",
    "url": "/api/shopping/:eventId",
    "title": "Get Event Shopping Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Id of event to get shopping items for</p>"
          }
        ]
      }
    },
    "name": "Get",
    "group": "Shopping",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "items",
            "description": "<p>List with objects of shopping items</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"items\": [\n    {\n      \"id\": \"284f1eae-1189-4f0c-936e-9221492076bd\",\n      \"name\": \"Decorations\",\n      \"event_id\": \"395e889d-8b38-45c9-b786-48427c64786a\",\n      \"cost\": 100,\n      \"purchased\": false,\n      \"notes\": \"none\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/shoppingRoutes.js",
    "groupTitle": "Shopping"
  },
  {
    "type": "put",
    "url": "/api/shopping/:itemId",
    "title": "Update A Shopping Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of item to update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t \"name\": \"Cutlery\",\n\t \"notes\": null,\n\t \"purchased\": false,\n\t \"cost\": 100,\n  \"event_id\": \"c4514ee7-fca7-4620-b25f-3b2ead42cf73\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "Update",
    "group": "Shopping",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with item data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"updated\": {\n    \"id\": \"284f1eae-1189-4f0c-936e-9221492076bd\",\n    \"name\": \"Cutlery\",\n    \"event_id\": \"c4514ee7-fca7-4620-b25f-3b2ead42cf73\",\n    \"cost\": 100,\n    \"purchased\": false,\n    \"notes\": null\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/shoppingRoutes.js",
    "groupTitle": "Shopping"
  },
  {
    "type": "post",
    "url": "/api/shopping/:eventId",
    "title": "Create A Todo Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Id of event to create todo item for</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t\"name\": \"find venue\",\n\t\"notes\": null,\n\t\"completed\": false\n}",
          "type": "json"
        }
      ]
    },
    "name": "Create",
    "group": "Todo",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with item data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"id\": \"6ff0c0bd-8615-4c23-8df9-cefe48d5a7c2\",\n  \"name\": \"Find Venue\",\n  \"notes\": null,\n  \"completed\": false,\n  \"event_id\": \"395e889d-8b38-45c9-b786-48427c64786a\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/toDoRoutes.js",
    "groupTitle": "Todo"
  },
  {
    "type": "get",
    "url": "/api/shopping/:eventId",
    "title": "Get Events' Todo Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Id of event to get todo items for</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t\"name\": \"find venue\",\n\t\"notes\": null,\n\t\"completed\": true\n}",
          "type": "json"
        }
      ]
    },
    "name": "Get",
    "group": "Todo",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with item data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n  \"id\": \"6ff0c0bd-8615-4c23-8df9-cefe48d5a7c2\",\n  \"name\": \"Find Venue\",\n  \"notes\": null,\n  \"completed\": false,\n  \"event_id\": \"395e889d-8b38-45c9-b786-48427c64786a\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/toDoRoutes.js",
    "groupTitle": "Todo"
  },
  {
    "type": "put",
    "url": "/api/todo/:itemId",
    "title": "Update A Todo Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of item to update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n  \"name\": \"Find Venue\",\n  \"notes\": null,\n  \"completed\": true,\n  \"eventId\": \"395e889d-8b38-45c9-b786-48427c64786a\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "Update",
    "group": "Todo",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "event",
            "description": "<p>Object with item data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"updated\": {\n  \"id\": \"6ff0c0bd-8615-4c23-8df9-cefe48d5a7c2\",\n  \"name\": \"Find Venue\",\n  \"notes\": null,\n  \"completed\": true,\n  \"event_id\": \"395e889d-8b38-45c9-b786-48427c64786a\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/toDoRoutes.js",
    "groupTitle": "Todo"
  }
] });
