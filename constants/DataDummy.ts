const imageUri = "data:image/png;base64,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"

export const ClientData = [
  { id: 0, name: "Susan", purchases: "08", value: "650.00", phoneNumber: "987654321", imageUri: null },
  { id: 1, name: "Darío", purchases: "10", value: "900.00", phoneNumber: "987654321", imageUri: imageUri },
  { id: 2, name: "Coco", purchases: "02", value: "80.00", phoneNumber: "987654321", imageUri: null },
  { id: 3, name: "Faku", purchases: "01", value: "50.00", phoneNumber: "987654321", imageUri: null },
  { id: 4, name: "Edu", purchases: "04", value: "300.00", phoneNumber: "987654321", imageUri: null },
];

export const DepartmentData = [
  {
    label: "Cardiology",
    icon: "heart",
  },
  {
    label: "Ophthalmology",
    icon: "eye",
  },
  {
    label: "Cardiology",
    icon: "heart",
  },
  {
    label: "Ophthalmology",
    icon: "eye",
  },
  {
    label: "Cardiology",
    icon: "heart",
  },
  {
    label: "Ophthalmology",
    icon: "eye",
  },
];

export const DoctorData = [
  {
    id: 1,
    name: "Jacob Lopez",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Dermatologist Specialist",
    others: "MBBS, DVV (Dermatologist)",
    rating: 4.9,
    reviews: 289,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 2,
    name: "Sophia Martinez",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Cardiologist",
    others: "MD, FACC",
    rating: 4.8,
    reviews: 310,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 3,
    name: "Ethan Johnson",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Neurologist",
    others: "MD, PhD (Neurology)",
    rating: 4.7,
    reviews: 256,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 4,
    name: "Olivia Brown",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Pediatrician",
    others: "MBBS, MD (Pediatrics)",
    rating: 3.9,
    reviews: 312,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 5,
    name: "Liam Wilson",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Orthopedic Surgeon",
    others: "MBBS, MS (Orthopedics)",
    rating: 4.8,
    reviews: 298,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 6,
    name: "Emma Davis",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Gynecologist",
    others: "MBBS, MD (Gynecology)",
    rating: 4.7,
    reviews: 278,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 7,
    name: "Noah Miller",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Psychiatrist",
    others: "MBBS, MD (Psychiatry)",
    rating: 4.6,
    reviews: 254,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 8,
    name: "Ava Garcia",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Ophthalmologist",
    others: "MBBS, MS (Ophthalmology)",
    rating: 4.8,
    reviews: 267,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 9,
    name: "William Martinez",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "ENT Specialist",
    others: "MBBS, MS (ENT)",
    rating: 4.7,
    reviews: 244,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
  {
    id: 10,
    name: "Mia Rodriguez",
    imageUrl:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    specialist: "Dentist",
    others: "BDS, MDS (Dentistry)",
    rating: 4.9,
    reviews: 298,
    details: [
      {
        label: "About",
        content: `Dr. Jacob Lopez is a highly skilled and exprienced is medical profesional dedicated to providing often of comprenhensive care in dermatology. Armed with the Bachelor of Medicine and Bachelor of Surgery then (MBBS) degree.

Dr. Lopez pursued further specialization in his known dermatology, obtaining a Diploma in Dermatology of and Venereology (DDV). With over 12 years of hands on experience in the field, he has honed his updated expertise in diagnosing and teating various patiends dermatological conditions with precisión and need compassion.`,
      },
      {
        label: "Experiences",
        content: "Too many Experiences",
      },
      {
        label: "Reviews",
        content: "Oh my Reviews",
      },
    ],
  },
];
