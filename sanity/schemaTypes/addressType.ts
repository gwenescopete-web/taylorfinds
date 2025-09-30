import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType ({
    name: "address",
    title: "Addresses",
    type: "document",
    icon: HomeIcon,
    fields: [
        defineField ({
            name: "name",
            title: "Address Name",
            type: "string",
            description: "(e.g. Home, Work, School",
            validation: (Rule) => Rule.required().max(50),
        }),
        defineField ({
            name: "email",
            title: "User Email",
            type: "email",
        }),
        defineField ({
            name: "address",
            title: "Street Address",
            type: "string",
            description: "Street Name, Building, House No.",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField ({
            name: "city",
            title: "City",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField ({
            name:"region",
            title: "Region",
            type: "string",
            description: "Region, Province",
            validation: (Rule) => Rule.required(),
        }),
        defineField ({
            name: "zip",
            title: "ZIP Code",
            type: "string",
            description: "Enter your ZIP Code",
            validation: (Rule) => 
                Rule.required()
                    .regex(/^\d{4}$/, {
                        name: "zipCode",
                        invert: false,
                    })
                    .custom((zip:string|undefined)=>{
                        if (!zip) {
                            return "ZIP code is required";
                        }
                        if (!zip.match(/^\d{4}$/)) {
                            return "Please enter a valid ZIP code";
                        }
                        return true;
                    }),
        }),
        defineField ({
            name: "default",
            title: "Default Address",
            type: "boolean",
            description: "Is this the default shipping address?",
            initialValue: false,
        }),
        defineField ({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "address",
            city: "city",
            region: "region",
            isDefault: "default",
        },
        prepare({title,subtitle,city,region,isDefault}) {
            return {
            title: `${title} ${isDefault ? "(Default)" : ""}`,
            subtitle: `${subtitle}, ${city}, ${region}`
            };
        },
    },
});