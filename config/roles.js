export const roles = [
    {
        role: 'admin',
        permissions: [
            'upload_article',
            'read_article',
            'delete_article',
            'create_user',
            'delete_user',
            'update_user',
            'read_users',
            'update_profile',
            'delete_profile',
            'get_patientresponse',
            'get_therapistprofile'
        ]
    },

    {
        role: 'patient',
        permissions: [
            'read_articles',
            'get_therapistprofile',
            'create_patientresponse',
            'update_patientresponse',
            'delete_patientresponse',
            'create_appointment',
            'update_appointment',
            'delete_appointment',
        ]
    },

    {
        role: 'therapist',
        permissions: [
            'upload_article',
            'read_articles',
            'delete_article',
            'get_patientresponses',
            'create_therapistprofile',
            'update_therapistprofile',
            'delete_therapistprofile',
            'get_appointments',
        ]
    }
]