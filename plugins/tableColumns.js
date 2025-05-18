// const baseurl = process.env.BASE_URL
const columns = {
    listingColumns : [

        {
            name: 'title',
            label: 'Title',
            field: 'title',
            sortable: true,
            align: 'left',
            width: '100',
        },
        {
            name: 'desc',
            label: 'Description',
            field: 'desc',
            sortable: true,
            align: 'left',
            width: '350',
        },
        {
            name: 'tags',
            label: 'Tags',
            field: 'tags',
            sortable: true,
            align: 'left',
            width: '100',
        },
        {
            name: 'approved',
            label: 'Status',
            field: 'approved',
            sortable: true,
            align: 'left',
            width: '100',
        },
        {
            name: 'createdAt',
            label: 'Status',
            field: 'createdAt',
            sortable: true,
            align: 'left',
            width: '100',
        },
        {
            name: 'action',
            label: 'Action',
            field: 'action',
            sortable: false,
            align: 'center',
            width: '100',
        }
    ]
  };
  export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("columns", columns);
  });
  