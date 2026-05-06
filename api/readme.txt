python3 -m venv venv
source venv/bin/activate
pip3 install -r requirement.txt
windows1- venv\Scripts\activate 
windows2 - uvicorn api.main:app --reload

Testing - Using Curl
Invoke-RestMethod -Uri "http://127.0.0.1:8000/mht" `
-Method Post `
-Headers @{"Content-Type"="application/json"} `
-Body '{
  "age":30,
  "gravida":2,
  "gest_weeks":26,
  "prev_gdm":false,
  "family":true,
  "pcod":false,
  "waist":85,
  "bp_sys":125,
  "bp_dia":85,
  "activity":"Moderate",
  "thirst":true,
  "urination":false,
  "hunger":true,
  "dark":false,
  "height_cm":160,
  "weight_kg":55,
  "iron_intake":"good",
  "diet_quality":"Good",
  "fatigue":false,
  "dizziness":false,
  "pale_eyelids":false,
  "pale_nails":false,
  "tongue":"Normal",
  "history":false
}'