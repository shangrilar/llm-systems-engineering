import unittest

from training_lab.capacity import choose_capacity


class CapacityTests(unittest.TestCase):
    def settings(self):
        return {"granularity": 4096, "min_tokens": 8192, "max_tokens": 131072, "headroom_bytes": 2000}

    def test_search_accounts_for_headroom_not_just_successful_allocation(self):
        seen = []
        def attempt(tokens):
            seen.append(tokens)
            return {"status": "oom" if tokens > 65536 else "ok", "peak_reserved": tokens,
                    "device_bytes": 65536}
        result = choose_capacity(attempt, self.settings())
        self.assertEqual(result["selected_tokens"], 61440)
        self.assertEqual(result["failed_upper_tokens"], 65536)
        self.assertEqual(len(seen), len(set(seen)))

    def test_search_stops_at_configured_ceiling(self):
        result = choose_capacity(lambda t: {"status": "ok", "peak_reserved": 10, "device_bytes": 1000000}, self.settings())
        self.assertEqual(result["selected_tokens"], 131072)
        self.assertIsNone(result["failed_upper_tokens"])

    def test_nonfitting_minimum_aborts_instead_of_selecting_an_unsafe_batch(self):
        with self.assertRaisesRegex(RuntimeError, "Minimum"):
            choose_capacity(lambda t: {"status": "oom", "peak_reserved": 0, "device_bytes": 100000}, self.settings())


if __name__ == "__main__":
    unittest.main()
