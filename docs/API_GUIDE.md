# Omoluabi API Guide

## 1. Authentication
The API uses a manual JWT system. Include the token in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

---

## 2. Contribution Flow

### Submit a Contribution
**URL**: `/contributions/submit`
**Method**: `POST`
**Body**:
```json
{
  "type": "CREATE", // or EDIT, DIALECT_VARIATION
  "dialectTag": "ijebu-id-here",
  "authorId": "user-id-here",
  "payload": {
    "type": "PROVERB",
    "title": "A canonical title",
    "textWithTone": "Ọmọlúàbí",
    "notes": "Linguistic notes..."
  }
}
```

### Review a Contribution
**URL**: `/reviews/submit`
**Method**: `POST`
**Body**:
```json
{
  "contributionId": "uuid-here",
  "reviewerId": "user-id-here",
  "approved": true,
  "comment": "Accurate tonal marks."
}
```

---

## 3. Knowledge Base

### Get All Knowledge Units
**URL**: `/knowledge?type=WORD`
**Method**: `GET`

### Get Specific Knowledge Unit (with Variations)
**URL**: `/knowledge/:id`
**Method**: `GET`

---

## 4. Dialects

### List All Dialects
**URL**: `/dialects`
**Method**: `GET`

---

## 6. Archival Proverbs
**URL**: `/proverbs`
**Method**: `GET`
**Query**: `?dialectId=uuid`

## 7. Community Chat
### Get Messages
**URL**: `/chat`
**Method**: `GET`

### Send Message
**URL**: `/chat`
**Method**: `POST`
**Body**:
```json
{
  "content": "The spirit of the word is eternal."
}
```
**Auth Required**: JWT Bearer Token.

---

## 5. User Progress

### Get Progress
**URL**: `/progress/:userId`
**Method**: `GET`

### Mark Completed
**URL**: `/progress/:userId/complete/:knowledgeUnitId`
**Method**: `POST`
**Body**:
```json
{
  "completed": true
}
```
