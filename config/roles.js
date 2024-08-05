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
            'get_response',
            'get_profile'
        ]
    },

    {
        role: 'patient',
        permissions: [
            'read_articles',
            'get_therapistProfile',
            'create_patientResponse',
            'update_patientResponse',
            'delete_patientResponse'
        ]
    },

    {
        role: 'therapist',
        permissions: [
            'upload_article',
            'read_articles',
            'delete_article',
            'get_patientResponses',
            'create_therapistProfile',
            'update_therapistProfile',
            'delete_therapistProfile'
        ]
    }
]