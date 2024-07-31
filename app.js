class AppointmentBooking {
    constructor() {
        this.appointments = [];
        this.availableSlots = {
            smith: this.getTimeSlots(), 
            johnson: this.getTimeSlots(), 
            williams: this.getTimeSlots() 
        };
    }

    bookAppointment(patientName, doctorName, appointmentDate, appointmentTime) {
        if (!patientName || !doctorName || !appointmentDate || !appointmentTime) {
            alert("All fields are required");
            return;
        }

        if (!this.isSlotAvailable(doctorName, appointmentTime)) {
            alert("Please select a valid time slot from the available options below.");
            return;
        }

        for (let appointment of this.appointments) {
            if (appointment.doctorName === doctorName &&
                appointment.appointmentDate === appointmentDate &&
                appointment.appointmentTime === appointmentTime) {
                alert("This slot is already booked");
                return;
            }
        }

        const newAppointment = { patientName, doctorName, appointmentDate, appointmentTime };
        this.appointments.push(newAppointment);
        alert("Appointment booked successfully");
        this.showAppointments();
    }

    cancelAppointment(appointmentId) {
        this.appointments = this.appointments.filter((appointment, index) => index !== parseInt(appointmentId, 10));
        alert("Appointment cancelled successfully");
        this.showAppointments();
    }

    showAppointments() {
        const textarea = document.getElementById("textarea");
        textarea.value = this.appointments.map((appointment, index) =>
            `ID: ${index} - ${appointment.patientName} with ${appointment.doctorName} on ${appointment.appointmentDate} at ${appointment.appointmentTime}`
        ).join("\n");
    }

    updateTimeSlots(doctorName) {
        const timeSlotInput = document.getElementById("appointment-time");
        timeSlotInput.innerHTML = "";

        const slots = this.availableSlots[doctorName];
        slots.forEach(slot => {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            timeSlotInput.appendChild(option);
        });
    }

    isSlotAvailable(doctorName, timeSlot) {
        const availableSlots = this.availableSlots[doctorName];
        return availableSlots.includes(timeSlot);
    }

    getTimeSlots() {
        const slots = [];
        let startTime = 8 * 60; 
        const endTime = 16 * 60; 
        const interval = 15; 

        for (let time = startTime; time <= endTime; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            slots.push(`${this.formatTime(hours)}:${this.formatTime(minutes)}`);
        }

        return slots;
    }

    getSmithTimeSlots() {
        const slots = [];
        let startTime = 9 * 60; 
        const endTime = 12 * 60 + 45; 
        const interval = 15;
        for (let time = startTime; time <= endTime; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            slots.push(`${this.formatTime(hours)}:${this.formatTime(minutes)}`);
        }

        return slots;
    }
    getJohnsonTimeSlots() {
        const slots = [];
        let startTime = 10 * 60; 
        const endTime = 15 * 60 + 45;
        const interval = 15;

        for (let time = startTime; time <= endTime; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            slots.push(`${this.formatTime(hours)}:${this.formatTime(minutes)}`);
        }

        return slots;
    }
    getWilliamsTimeSlots() {
        const slots = [];
        let startTime = 8 * 60; 
        const endTime = 14 * 60 + 45; 
        const interval = 15; 

        for (let time = startTime; time <= endTime; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            slots.push(`${this.formatTime(hours)}:${this.formatTime(minutes)}`);
        }

        return slots;
    }

    formatTime(unit) {
        return unit < 10 ? `0${unit}` : unit;
    }
}

const bookingSystem = new AppointmentBooking();

document.querySelector(".form1").addEventListener("submit", (event) => {
    event.preventDefault();
    const patientName = document.getElementById("patient-name").value;
    const doctorName = document.getElementById("doctor-names").value;
    const appointmentDate = document.getElementById("appointment-date").value;
    const appointmentTime = document.getElementById("appointment-time").value;
    bookingSystem.bookAppointment(patientName, doctorName, appointmentDate, appointmentTime);
});

document.querySelector(".form2").addEventListener("submit", (event) => {
    event.preventDefault();
    const appointmentId = document.getElementById("appointment-id").value;
    bookingSystem.cancelAppointment(appointmentId);
});

document.getElementById("btn3").addEventListener("click", (event) => {
    bookingSystem.showAppointments();
});


document.getElementById("doctor-names").addEventListener("change", (event) => {
    const doctorName = event.target.value;
    bookingSystem.updateTimeSlots(doctorName);
});


document.addEventListener("DOMContentLoaded", () => {
    bookingSystem.updateTimeSlots(document.getElementById("doctor-names").value);
});
