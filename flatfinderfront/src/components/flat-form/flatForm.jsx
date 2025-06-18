import { Button, Checkbox, DatePicker, Input } from "@heroui/react";
import { parseDate, today } from "@internationalized/date";

const FlatForm = ({ flat, setFlat, action, buttonText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    action(flat);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          value={flat.city}
          onChange={(e) => setFlat({ ...flat, city: e.target.value })}
          label="City"
          type="text"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter city"
          autoComplete="off"
          validate={(value) =>
            value.length > 1 || "City must be at least 2 characters long"
          }
        />
        {/* Input for streetName */}
        <Input
          value={flat.streetName}
          onChange={(e) => setFlat({ ...flat, streetName: e.target.value })}
          label="Street Name"
          type="text"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter street name"
          autoComplete="off"
          validate={(value) =>
            value.length > 1 || "Street name must be at least 2 characters long"
          }
        />
        {/* Input for streetNumber */}
        <Input
          value={flat.streetNumber}
          onChange={(e) => setFlat({ ...flat, streetNumber: e.target.value })}
          label="Street Number"
          type="number"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter street number"
          autoComplete="off"
          validate={(value) =>
            value > 0 || "Street number must be greater than 0"
          }
        />
        {/* Input for areaSize */}
        <Input
          value={flat.areaSize}
          onChange={(e) => setFlat({ ...flat, areaSize: e.target.value })}
          label="Area Size"
          type="number"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter area size"
          autoComplete="off"
          validate={(value) => value > 0 || "Area size must be greater than 0"}
        />
        {/* Input for price */}
        <Input
          value={flat.rentPrice}
          onChange={(e) => setFlat({ ...flat, rentPrice: e.target.value })}
          label="Rent Price"
          type="number"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter Rent Price"
          autoComplete="off"
          validate={(value) => value > 0 || "Price must be greater than 0"}
        />
        {/* Input for Year Built */}
        <Input
          value={flat.yearBuilt}
          onChange={(e) => setFlat({ ...flat, yearBuilt: e.target.value })}
          label="Year Built"
          type="number"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter Year Built"
          autoComplete="off"
          validate={(value) => {
            const currentYear = new Date().getFullYear();
            const age = currentYear - value;

            if (age > 50 || age < 0) {
              return "Year built must be less than 50 years ago and not in the future";
            }

            return true;
          }}
        />
        {/* Input for date available */}
        <DatePicker
          value={
            flat.dateAvailable
              ? parseDate(flat.dateAvailable.slice(0, 10))
              : null
          }
          onChange={(e) => {
            setFlat({ ...flat, dateAvailable: e?.toString() || null });
          }}
          label="Date Available"
          className="flat-input text-txtlight dark:text-txtdark"
          variant="underlined"
          placeholder="Enter Date Available"
          showMonthAndYearPickers
          autoComplete="off"
          validate={(value) => {
            const inputDate = parseDate(value.toString());
            const todayDate = today("UTC");

            if (inputDate.compare(todayDate) <= 0) {
              return "Date available must be from tomorrow onwards";
            }
            return true;
          }}
        />

        {/* input para hasAC */}
        <Checkbox
          isSelected={flat.hasAC}
          onValueChange={(value) => setFlat({ ...flat, hasAC: value })}
          className="mt-2"
        >
          Has AC
        </Checkbox>
        <div>
          <Button type="submit" color="primary" className="w-full mt-2">
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlatForm;
