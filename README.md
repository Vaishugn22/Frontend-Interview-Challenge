# Hospital Appointment Scheduler - Frontend Challenge

## 🎯 Challenge Overview

This is a **hospital appointment scheduling frontend** built with **Next.js 14 + TypeScript**.  
It allows users to view appointments in **day** and **week** calendar views, with **role-based access**:

- **Front Desk Staff**: Can view all doctors' schedules via a dropdown.
- **Doctors**: Can view only their own schedule (doctor dropdown hidden).

---

## 📋 Scenario

To build an internal hospital scheduling system. The hospital has:
- **Doctors** with different specialties and working hours
- **50 Patients** with various appointments
- **Appointments** scheduled throughout the week

**User Roles**:
- **Front Desk Staff**: Can view all doctors' schedules
- **Doctors**: Can view only their own schedule

---

## 🏗️ Features

### Calendar Views
- **Day View**
  - 8:00 AM – 6:00 PM, 30-minute intervals.
  - Displays appointments with type, duration, and patient ID.
  - Handles overlapping appointments.
- **Week View**
  - 7-day grid (Monday–Sunday).
  - Correctly positions appointments by day and time.
  - Color-coded by appointment type:
    - Checkup: Blue (#3b82f6)
    - Consultation: Green (#10b981)
    - Follow-up: Orange (#f59e0b)
    - Procedure: Purple (#8b5cf6)

### Role-Based Views
- **Front Desk Staff**
  - Doctor dropdown available.
  - Can view selected doctor’s schedule.
- **Doctor**
  - Only sees their own schedule.
  - Doctor dropdown hidden.

### UI/UX Enhancements
- Responsive layout for mobile and desktop.
- Loading and empty states handled.
- Home page has centered content with gradient background and floating animation.
- Animated buttons with hover effects.

---

## 📁 Project Structure

app/

├── page.tsx # Home page

├── schedule/page.tsx # Schedule page

├── components/

│ ├── ScheduleView.tsx

│ ├── DayView.tsx

│ ├── WeekView.tsx

│ └── ui/

├── hooks/

│ └── useAppointments.ts

├── services/

│ └── appointmentService.ts

├── domain/

│ └── TimeSlot.ts

│ └── Appointment.ts

├── types/

│ └── index.ts

└── data/

└── mockData.ts


---

## ⚡ Usage

##Install dependencies:
```bash
npm install
 ```
**2. Run development server:**
```
npm run dev
```
**3. Open http://localhost:3000**
```
**4. Test roles on the Schedule Page:**
```
Select Front Desk Staff → Doctor dropdown appears.

Select Doctor → Only the logged-in doctor’s schedule is shown.

🏗️ Architecture Decisions

##Separation of Concerns

->UI Components: DayView, WeekView, ScheduleView

->Business Logic: useAppointments hook

->Data Access: appointmentService.ts

##Headless Components

->Logic separated from presentation for reusability.

##Domain Models

->TimeSlot class implemented to handle overlapping and future expansion.

##📌 Future Improvements

->Appointment search/filter

->Current time indicator (red line)

->Side-by-side multiple doctor view

->Dark mode and accessibility enhancements

->Integration with real backend and authentication





