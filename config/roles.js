export const roles = [
{
    role: 'admin',
    permissions: [
        'create_article',
        'read_article',
        'update_article',
        'delete_article',
        'create_user',
        'delete_user',
        'update_user',
        'update_profile',
        'delete_profile',
    ]
},

{
    role: 'patient',
    permissions: [
        'update_profile',
        'delete_profile',
        'read_articles',
    ]
},

{
    role: 'therapist',
    permissions: [
       'create_article',
       'read_articles',
       'update_article' ,
       'update_profile',
        'delete_profile',
       ]
}
]